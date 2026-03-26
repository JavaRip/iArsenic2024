import uuid4 from 'uuid4';
import { KnownError } from '../errors';
import { AccessToken, User, UserSchema, validateModel, Language, Units, VerifyEmailTokenSchema, AccessTokenSchema, AbstractToken } from '../models';
import { UserRepo, TokenRepo } from '../repositories'
import bcrypt from 'bcrypt'
import sendMail from '../emails/sendMail';
import verifyEmailTemplate from '../emails/templates/verifyEmail';
import signedUrl from '../utils/signedUrl';

// 7 days
const ACCESS_TOKEN_TTL = 1000 * 60 * 60 * 24 * 7

export const UserService = {
    async getById(requestingUser: User, userId: string): Promise<User> {
        if (requestingUser.type !== 'admin') {
            if (requestingUser.id !== userId) {
                // allow users to view user profiles of users other than themselves
            }
        }

        const userRes = await UserRepo.findById(userId)

        if (userRes == null) {
            throw new KnownError({
                message: 'User not found',
                code: 404,
                name: 'UserNotFoundError',
            });
        }

        delete userRes.password

        // avatarUrl stores the GCS path; generate a fresh signed URL before returning
        if (userRes.avatarUrl && !userRes.avatarUrl.startsWith('http')) {
            userRes.avatarUrl = await signedUrl('read', userRes.avatarUrl);
        }

        return userRes
    },

    async getByEmail(email: string): Promise<User> {
        const userRes = await UserRepo.findByEmail(email)

        if (userRes == null) {
            throw new KnownError({
                message: 'User not found',
                code: 404,
                name: 'UserNotFoundError',
            });
        }

        delete userRes.password

        return userRes
    },

    async updateUser(
        auth: { user: User | { type: 'guest' }, token: AbstractToken },
        userId: string,
        userUpdates: Partial<User>
    ): Promise<User> {
        if (auth.user.type === 'guest') {
            throw new KnownError({
                name: 'Unauthorised',
                message: 'Login to update existing users',
                code: 403,
            });
        }

        if (auth.user.type !== 'admin') {
            if (auth.user.id !== userId) {
                throw new KnownError({
                    name: 'Unauthorised',
                    message: 'Updating users other than self forbidden',
                    code: 403,
                });
            }
        }

        const user = await UserRepo.findById(userId)

        if (user == null) {
            throw new KnownError({
                message: 'User not found',
                code: 404,
                name: 'UserNotFoundError',
            });
        }

        const newUser = {
            ...user,
            ...userUpdates,
        }

        const validatedNewUser = UserSchema.parse(newUser)

        await UserRepo.update(validatedNewUser)
        return validatedNewUser
    },

    async getAllUsers(
        auth: { user: User | { type: 'guest' }, token: AbstractToken },
    ): Promise<User[]> {
        if (auth.user.type !== 'admin') {
            throw new KnownError({
                message: 'Unauthorized',
                code: 403,
                name: 'UnauthorizedError',
            });
        }
        if (!UserRepo.findAll) throw new Error('UserRepo.findAll not implemented');
        const users = await UserRepo.findAll();
        return users.map((u) => { delete u.password; return u; });
    },

    async getAvatarUploadUrl(
        auth: { user: User | { type: 'guest' }, token: AbstractToken },
        userId: string,
        contentType: string,
    ): Promise<{ signedUrl: string; path: string }> {
        if (auth.user.type === 'guest') {
            throw new KnownError({ name: 'Unauthorised', message: 'Login to upload avatar', code: 403 });
        }
        if (auth.user.type !== 'admin' && (auth.user as User).id !== userId) {
            throw new KnownError({ name: 'Unauthorised', message: 'Cannot upload avatar for another user', code: 403 });
        }
        const ext = contentType === 'image/png' ? '.png' : contentType === 'image/webp' ? '.webp' : '.jpg';
        const path = `users/${userId}/avatar${ext}`;
        const url = await signedUrl('write', path, contentType);
        return { signedUrl: url, path };
    },

    async confirmAvatarUpload(
        auth: { user: User | { type: 'guest' }, token: AbstractToken },
        userId: string,
        avatarPath: string,
    ): Promise<User> {
        if (auth.user.type === 'guest') {
            throw new KnownError({ name: 'Unauthorised', message: 'Login to update avatar', code: 403 });
        }
        if (auth.user.type !== 'admin' && (auth.user as User).id !== userId) {
            throw new KnownError({ name: 'Unauthorised', message: 'Cannot update avatar for another user', code: 403 });
        }
        const user = await UserRepo.findById(userId);
        if (user == null) {
            throw new KnownError({ message: 'User not found', code: 404, name: 'UserNotFoundError' });
        }
        // Store the GCS path in the DB; return a fresh signed URL to the client
        const updatedUser = UserSchema.parse({ ...user, avatarUrl: avatarPath });
        await UserRepo.update(updatedUser);
        delete updatedUser.password;
        const avatarSignedUrl = await signedUrl('read', avatarPath);
        return { ...updatedUser, avatarUrl: avatarSignedUrl };
    },

    async createUser(
        email: string,
        password: string,
        name: string,
        language: Language,
        units: Units,
    ): Promise<{ user: User; token: AccessToken }> {
        const existingUser = await UserRepo.findByEmail(email);

        if (existingUser != null) {
            throw new KnownError({
                message: 'User with this email already exists',
                code: 400,
                name: 'ValidationError',
            });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = UserSchema.parse({
            id: uuid4(),
            email,
            emailVerified: false,
            password: hashedPassword,
            name,
            type: 'user',
            createdAt: new Date(),
            language,
            units,
        });

        const user = await UserRepo.create({ ...newUser });

        const result = validateModel(user, UserSchema);
        if (!result.ok) throw new Error(
            `Invalid user data: ${result.error.message} for user ID: ${user.id}`
        );

        const verifyEmailToken = await TokenRepo.create({
            id: uuid4(),
            userId: user.id,
            createdAt: new Date(),
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
            type: 'verify-email',
        });

        const validatedToken = VerifyEmailTokenSchema.parse(verifyEmailToken);

        const verifySubject = language === 'bengali'
            ? 'iArsenic ইমেইল যাচাই করুন'
            : 'Verify your email';

        await sendMail(
            user.email,
            verifySubject,
            verifyEmailTemplate(validatedToken, user.name, language),
        );

        // Issue access token immediately after registration
        const accessTokenRecord = await TokenRepo.create({
            id: uuid4(),
            userId: user.id,
            createdAt: new Date(),
            expiresAt: new Date(Date.now() + ACCESS_TOKEN_TTL),
            type: 'access',
        });

        const token = AccessTokenSchema.parse(accessTokenRecord);

        delete user.password;

        return { user, token };
    },
}
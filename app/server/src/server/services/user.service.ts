import uuid4 from 'uuid4';
import { KnownError } from '../errors';
import { AccessToken, User, UserSchema, validateModel, Language, Units, VerifyEmailTokenSchema, AccessTokenSchema } from '../models';
import { UserRepo, TokenRepo } from '../repositories'
import bcrypt from 'bcrypt'
import sendMail from '../emails/sendMail';
import verifyEmailTemplate from '../emails/templates/verifyEmail';

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

        return userRes
    },

    async updateUser(userId: string, userUpdates: Partial<User>): Promise<User> {
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
    
        await sendMail(
            user.email,
            'Verify your email',
            verifyEmailTemplate(validatedToken, user.name),
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
import { OAuth2Client } from "google-auth-library";
import { AccessToken, AccessTokenSchema, RefreshToken, RefreshTokenSchema, ResetPasswordToken, User, VerifyEmailToken } from '../models';
import bcrypt from 'bcrypt'
import { TokenRepo, UserRepo } from '../repositories';
import { KnownError } from '../errors';
import uuidv4 from 'uuid4'
import resetPasswordTemplate from "../emails/templates/resetPassword";
import { UserService } from "./user.service";
import sendMail from "../emails/sendMail";
import verifyEmailTemplate from "../emails/templates/verifyEmail";

export const AuthService = {
    async verifyEmail(
        verifyEmailTokenId: string,
    ): Promise<void> {
        const token = await TokenRepo.findById(verifyEmailTokenId);

        if (!token) {
            throw new KnownError({
                name: 'Invalid token',
                message: 'Verify email token not found',
                code: 404,
            });
        }

        if (token.expiresAt < new Date()) {
            throw new KnownError({
                name: 'Token expired',
                message: 'Password reset token has expired',
                code: 403,
            });
        }

        const user = await UserRepo.findById(token.userId);

        if (!user) {
            throw new KnownError({
                name: 'User not found',
                message: 'User associated with this verify token does not exist',
                code: 404,
            });
        }

        await UserRepo.update({
            ...user,
            emailVerified: true,
        });

        await TokenRepo.update({
            ...token,
            revokedAt: new Date(),
        });
    },

    async logout(
        // user: User,
        token: RefreshToken,
    ): Promise<void> {
        // TODO setup repo queries so we can
        // find an revoke all user tokens
        await TokenRepo.update({
            ...token,
            revokedAt: new Date(),
        })
    },

    async forgotPassword(
        email: string,
    ): Promise<void> {
        const user = await UserService.getByEmail(email)

        const resetToken = await TokenRepo.create({
            id: uuidv4(),
            userId: user.id,
            createdAt: new Date(),
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
            type: 'reset-password',
        })

        const emailBody = resetPasswordTemplate(
            resetToken as ResetPasswordToken,
            user.name,
        )

        await sendMail(
            email,
            'Reset iArsenic Password',
            emailBody,
        )
    },

    async resetPassword(
        resetTokenId: string, 
        newPassword: string,
    ): Promise<void> {
        const token = await TokenRepo.findById(resetTokenId);

        if (!token) {
            throw new KnownError({
                name: 'Invalid token',
                message: 'Password reset token not found',
                code: 404,
            });
        }

        if (token.expiresAt < new Date()) {
            throw new KnownError({
                name: 'Token expired',
                message: 'Password reset token has expired',
                code: 403,
            });
        }

        const user = await UserRepo.findById(token.userId);
        if (!user) {
            throw new KnownError({
                name: 'User not found',
                message: 'User associated with this reset token does not exist',
                code: 404,
            });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        await UserRepo.update({
            ...user,
            password: hashedPassword,
        });

        await TokenRepo.update({
            ...token,
            revokedAt: new Date(),
        });
    },

    async login(
        email: string, 
        password: string,
    ): Promise<{
        user: User,
        accessToken: AccessToken,
        refreshToken: RefreshToken,
    }> {
        const existingUser = await UserRepo.findByEmail(
            email,
        )

        if (!existingUser) {
            throw new KnownError({
                name: 'User not found',
                message: `User email ${email} not found`,
                code: 404,
            })
        }

        if (!existingUser?.password) {
            throw new KnownError({
                name: 'NoPasswordInPasswordLogin',
                message: `No password configured. Please login with Google`,
                code: 400,
            })
        }

        const passwordMatch = await bcrypt.compare(
            password, 
            existingUser.password
        );

        if (!passwordMatch) {
            throw new KnownError({
                name: 'Invalid credentials',
                message: `Email and password do not match`,
                code: 403,
            });
        }

        delete existingUser.password

        const accessToken = await TokenRepo.create({
            id: uuidv4(),
            createdAt: new Date(),
            type: "access",
            userId: existingUser.id,
            expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
        })

        const refreshToken = await TokenRepo.create({
            id: uuidv4(),
            createdAt: new Date(),
            type: "refresh",
            userId: existingUser.id,
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        })

        return { 
            user: existingUser,
            refreshToken: RefreshTokenSchema.parse(refreshToken), 
            accessToken: AccessTokenSchema.parse(accessToken),
        }
    },

    async register_email_password(
        email: string,
        language: 'bengali' | 'english',
        password: string,
        units: 'feet' | 'meters',
        username: string,
    ): Promise<{
        user: User,
        accessToken: AccessToken,
        refreshToken: RefreshToken,
    }> {
        const saltRounds = 10;
        const passHash = await bcrypt.hash(password, saltRounds);

        const existingUser = await UserRepo.findByEmail(
            email,
        )

        if (existingUser) {
            throw new KnownError({
                name: 'User already exists',
                message: `User already exists with email ${email}`,
                code: 403,
            })
        }

        const newUser = await UserRepo.create({
            id: uuidv4(),
            email: email,
            emailVerified: false,
            password: passHash, 
            name: username,
            type: 'user',
            createdAt: new Date(),
            language: language, 
            units: units, 
        })

        delete newUser.password

        const accessToken = await TokenRepo.create({
            id: uuidv4(),
            createdAt: new Date(),
            type: "access",
            userId: newUser.id,
            expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
        })

        const refreshToken = await TokenRepo.create({
            id: uuidv4(),
            createdAt: new Date(),
            type: "refresh",
            userId: newUser.id,
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        })

        const verifyEmailToken = await TokenRepo.create({
            id: uuidv4(),
            type: "verify-email",
            userId: newUser.id,
            createdAt: new Date(),
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        })

        const mailBody = verifyEmailTemplate(
            (verifyEmailToken as VerifyEmailToken),
            newUser.name, 
        )

        await sendMail(
            newUser.email,
            'Verify iArsenic Email',
            mailBody,
        )

        return { 
            user: newUser,
            refreshToken: RefreshTokenSchema.parse(refreshToken), 
            accessToken: AccessTokenSchema.parse(accessToken),
        }
    },

    async register_google_oauth(
        idToken: string,
        language: 'bengali' | 'english',
        units: 'feet' | 'meters',
    ): Promise<{
        user: User,
        accessToken: AccessToken,
        refreshToken: RefreshToken,
    }> {
        const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        const ticket = await googleClient.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        if (!payload?.email) {
            throw new KnownError({
                name: "Invalid Google token",
                message: "Google token did not contain an email",
                code: 400,
            });
        }

        const email = payload.email;
        const username = payload.name || email.split("@")[0];
        const avatarUrl = payload.picture;

        let user = await UserRepo.findByEmail(email);

        if (!user) {
            user = await UserRepo.create({
                id: uuidv4(),
                email,
                emailVerified: payload.email_verified || false,
                name: username || 'no-username-provided',
                type: 'user',
                createdAt: new Date(),
                language,
                units,
                avatarUrl,
            });

            const verifyEmailToken = await TokenRepo.create({
                id: uuidv4(),
                type: "verify-email",
                userId: user.id,
                createdAt: new Date(),
                expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
            })


            const mailBody = verifyEmailTemplate(
                (verifyEmailToken as VerifyEmailToken),
                user.name, 
            )

            await sendMail(
                user.email,
                'Verify iArsenic Email',
                mailBody,
            )
        }

        delete user.password;

        const accessToken = await TokenRepo.create({
            id: uuidv4(),
            type: "access",
            userId: user.id,
            createdAt: new Date(),
            expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 min
        });

        const refreshToken = await TokenRepo.create({
            id: uuidv4(),
            type: "refresh",
            userId: user.id,
            createdAt: new Date(),
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        });

        return {
            user,
            accessToken: AccessTokenSchema.parse(accessToken),
            refreshToken: RefreshTokenSchema.parse(refreshToken),
        };
    },

    async refresh(refreshToken: RefreshToken): Promise<AccessToken> {
        if (
            refreshToken.expiresAt < new Date() ||
            (refreshToken.revokedAt && refreshToken.revokedAt < new Date())
        ) {
            throw new KnownError({
                name: 'Invalid refresh token',
                message: 'Refresh token expired',
                code: 403,
            })
        }

        const accessToken = await TokenRepo.create({
            id: uuidv4(),
            createdAt: new Date(),
            type: "access",
            userId: refreshToken.userId,
            expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
        })

        return AccessTokenSchema.parse(accessToken)
    }
}
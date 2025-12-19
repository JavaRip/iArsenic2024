import { AbstractToken, AccessToken, AccessTokenSchema, RefreshToken, RefreshTokenSchema, User } from '../models';
import bcrypt from 'bcrypt'
import { TokenRepo, UserRepo } from '../repositories';
import { KnownError } from '../errors';
import uuidv4 from 'uuid4'

export const AuthService = {
    async verifyEmail(
        tokenId: string,
    ): Promise<AbstractToken> {
        console.log(tokenId)
        throw new Error('Unimplemented')
    },

    async forgotPassword(
        email: string,
    ): Promise<void> {
        console.log(email)
        throw new Error('Unimplemented')
    },

    async resetPassword(
        resetTokenId: string, 
        newPassword: string,
    ): Promise<void> {
        console.log(resetTokenId)
        console.log(newPassword)
        throw new Error('Unimplemented')
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
                name: 'User has no password configured',
                message: `Try an alternative login method`,
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
        token: AccessToken,
    }> {
        console.log(idToken)
        console.log(language)
        console.log(units)
        throw new Error('Unimplemented')
    },

    async refresh(refreshTokenId: string): Promise<AccessToken> {
        console.log(refreshTokenId)
        throw new Error('Unimplemented')
    }
}
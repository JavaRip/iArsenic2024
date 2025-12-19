import { AbstractToken, AccessToken, User } from 'iarsenic-types';
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
    ): Promise<AccessToken> {
        console.log(email)
        console.log(password)
        throw new Error('Unimplemented')
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

        const accessToken = TokenRepo.create({
            id: uuidv4(),
            createdAt: new Date(),
            type: "access",
            userId: newUser.id,
            expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
        })

        const refreshToken = TokenRepo.create({
            id: uuidv4(),
            createdAt: new Date(),
            type: "refresh",
            userId: newUser.id,
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        })
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
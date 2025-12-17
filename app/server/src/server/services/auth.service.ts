import { AbstractToken, AccessToken, User } from 'iarsenic-types';

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
        password: string,
        language: 'bengali' | 'english',
        units: 'ft' | 'm',
    ): Promise<{
        user: User,
        token: AccessToken,
    }> {
        console.log(email)
        console.log(password)
        console.log(language)
        console.log(units)
        throw new Error('Unimplemented')
    },

    async register_google_oauth(
        idToken: string,
        language: 'bengali' | 'english',
        units: 'ft' | 'm',
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
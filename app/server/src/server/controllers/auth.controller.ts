import { Context } from "koa";
import { KnownError } from "../errors";
import { AccessToken, LoginRequestSchema } from '../models';
import { AuthService } from "../services";
import { z } from 'zod';

const BaseRegisterSchema = z.object({
    units: z.enum(['feet', 'meters']).optional(),
    language: z.enum(['bengali', 'english']).optional(),
    username: z.string(),
});

export const UsernamePasswordRegisterBodySchema = BaseRegisterSchema.extend({
    method: z.literal('email_pass'),
    password: z.string(),
    email: z.string().email(),
});

export const GoogleOAuthRegisterBodySchema = BaseRegisterSchema.extend({
    method: z.literal('google_oauth'),
    idToken: z.string(),
});

export const RegisterRequestBodySchema = z.discriminatedUnion('method', [
    UsernamePasswordRegisterBodySchema,
    GoogleOAuthRegisterBodySchema,
]);

export const AuthController = {
    async verifyEmail(ctx: Context): Promise<void> {
        const tokenId = ctx.params.token;
        await AuthService.verifyEmail(tokenId);

        ctx.status = 200;
        ctx.body = { message: 'Email verified successfully' };
    },

    async forgotPassword(ctx: Context): Promise<void> {
        const email = (ctx.request.body as { email: string }).email;

        if (!email) {
            throw new KnownError({
                message: 'Email is required',
                code: 400,
                name: 'ValidationError',
            });
        }

        await AuthService.forgotPassword(email);

        ctx.status = 200;
        ctx.body = {
            message: `
                Password reset email sent if account with email exists
            `,
        };
    },

    async resetPassword(ctx: Context): Promise<void> {
        const resetTokenId: string = ctx.params.token;

        if (!resetTokenId) {
            throw new KnownError({
                message: 'Reset token is required',
                code: 400,
                name: 'ValidationError',
            });
        }

        const newPassword = (ctx.request.body as { newPassword: string }).newPassword;

        if (!newPassword) {
            throw new KnownError({
                message: 'New password is required',
                code: 400,
                name: 'ValidationError',
            });
        }

        // Validate the reset token and reset the password
        await AuthService.resetPassword(resetTokenId, newPassword);

        ctx.status = 200;
        ctx.body = {
            message: 'Password has been successfully reset.',
        };
    },

    async register(ctx: Context): Promise<void> {
        const body = RegisterRequestBodySchema.parse(ctx.request.body)
        const method = body.method
        console.log(body)

        let user, accessToken, refreshToken 

        switch (body.method) {
            case 'email_pass':
                ({ user, accessToken, refreshToken } =
                    await AuthService.register_email_password(
                        body.email,
                        body.language ?? 'bengali',
                        body.password,
                        body.units ?? 'feet',
                        body.username,
                    ))
                break;

            // case 'google_oauth':
            //     ({ user, accessToken, refreshToken } =
            //         await AuthService.register_google_oauth(
            //             body.idToken,
            //             body.language ?? 'bengali',
            //             body.units ?? 'feet',
            //         )
            //     )
            //     break;

            default:
                throw new Error(
                    `Invalid registration method ${method}`
                );
        }

        ctx.cookies.set('refreshToken', refreshToken.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/api/v1/auth/refresh',
            maxAge: 30 * 24 * 60 * 60 * 1000,
        })
    
        ctx.status = 201;
        ctx.body = { user, accessToken };
    },

    async login(ctx: Context): Promise<void> {
        const loginRequestRes = LoginRequestSchema.safeParse(ctx.request.body)

        if (!loginRequestRes.success) {
            throw new KnownError({
                message: loginRequestRes.error.message,
                code: 400,
                name: 'ValidationError',
            });
        }

        const loginRequest = loginRequestRes.data

        const { user, accessToken, refreshToken } = await AuthService.login(
            loginRequest.email,
            loginRequest.password,
        )

        ctx.cookies.set('refreshToken', refreshToken.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/api/v1/auth/refresh',
            maxAge: 30 * 24 * 60 * 60 * 1000,
        })

        ctx.status = 200
        ctx.body = { user, accessToken }
    },

    async refresh(ctx: Context): Promise<AccessToken> {
        const refreshTokenId = ctx.state.auth.token

        if (!refreshTokenId) {
            throw new KnownError({
                message: 'No refresh token',
                code: 400,
                name: 'ValidationError',
            });
        }

        const newAccessToken = await AuthService.refresh(
            refreshTokenId,
        )

        return newAccessToken
    }
}
import { Context } from "koa";
import { KnownError } from "../errors";
import { LoginRequestSchema } from '../models';
import { AuthService } from "../services";
import { z } from 'zod';

const BaseRegisterSchema = z.object({
    units: z.enum(['feet', 'meters']).optional(),
    language: z.enum(['bengali', 'english']).optional(),
});

export const UsernamePasswordRegisterBodySchema = BaseRegisterSchema.extend({
    method: z.literal('email_pass'),
    password: z.string(),
    email: z.string().email(),
    username: z.string(),
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

    async logout(ctx: Context): Promise<void> {
        // const user = ctx.state.auth.user
        const token = ctx.state.auth.token

        // const parsedUser = UserSchema.parse(user)

        await AuthService.logout(
            // parsedUser,
            token,
        );

        ctx.cookies.set('__session', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'local',
            sameSite: 'lax',
            expires: new Date(0),
            path: '/',
        });

        ctx.status = 200;
        ctx.body = { message: 'User logged out successfully' };
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

            case 'google_oauth':
                ({ user, accessToken, refreshToken } =
                    await AuthService.register_google_oauth(
                        body.idToken,
                        body.language ?? 'bengali',
                        body.units ?? 'feet',
                    )
                )
                break;

            default:
                throw new Error(
                    `Invalid registration method ${method}`
                );
        }

        ctx.cookies.set('__session', refreshToken.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'local',
            sameSite: 'lax',
            path: '/',
            maxAge: 30 * 24 * 60 * 60 * 1000,
            secureProxy: true,
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

        ctx.cookies.set('__session', refreshToken.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'local',
            sameSite: 'lax',
            path: '/',
            maxAge: 30 * 24 * 60 * 60 * 1000,
            secureProxy: true,
        })

        ctx.status = 200
        ctx.body = { user, accessToken }
    },

    async refresh(ctx: Context): Promise<void> {
        const refreshToken = ctx.state.auth.token
        const user = ctx.state.auth.user

        if (!refreshToken) {
            throw new KnownError({
                message: 'No refresh token on ctx',
                name: 'NoRefreshToken',
                code: 403,
            }
            )
        }

        if (!user) {
            throw new Error('No user on ctx')
        }

        const newAccessToken = await AuthService.refresh(
            refreshToken,
        )

        ctx.status = 200
        ctx.body = newAccessToken
    }
}
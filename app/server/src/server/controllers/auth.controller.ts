import { Context } from "koa";
import { KnownError } from "../errors";
import { AccessToken, LoginRequestSchema, RegisterRequestSchema } from "iarsenic-types";
import { AuthService } from "../services";

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
        console.log('================================')
        console.log(ctx.request.body)
        const bodyParseRes = RegisterRequestSchema.safeParse(ctx.request.body);
    
        if (!bodyParseRes.success) {
            throw new KnownError({
                message: bodyParseRes.error.message,
                code: 400,
                name: 'ValidationError',
            });
        }
    
        const body = bodyParseRes.data;
    
        const { user, token } = await AuthService.register(
            body.email,
            body.password,
            body.language,
            body.units,
        );
    
        ctx.status = 201;
        ctx.body = { user, token };
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

        const accessToken: AccessToken = await AuthService.login(
            loginRequest.email,
            loginRequest.password,
        )

        ctx.status = 200
        ctx.body = { accessToken }
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
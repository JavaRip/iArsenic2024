import { AccessTokenSchema, UserSchema } from '../models'
import { KnownError } from '../errors'
import { Context } from 'koa'
import { UserService } from '../services'

export const UserController = {
    async getUserByToken(ctx: Context): Promise<void> {
        const auth = ctx.state.auth

        if (!auth.token) {
            throw new KnownError({
                message: 'Unauthorized',
                code: 403,
                name: 'UnauthorizedError',
            });
        }

        const user = auth.user

        ctx.status = 200;
        ctx.body = { ...user };
    },

    async updateUserByToken(ctx: Context): Promise<void> {
        const auth = ctx.state.auth

        const token = AccessTokenSchema.parse(auth.token);
        const user = UserSchema.parse(auth.user)

        if (!ctx.request.body) {
            throw new KnownError({
                message: 'Request body is required',
                code: 400,
                name: 'ValidationError',
            })
        }

        if (token.userId !== user.id) {
            throw new KnownError({
                message: 'Unauthorized',
                code: 403,
                name: 'UnauthorizedError',
            });
        }

        const userUpdateParseRes = UserSchema.partial().safeParse(
            ctx.request.body
        )

        if (!userUpdateParseRes.success) {
            throw new KnownError({
                message: userUpdateParseRes.error.message,
                code: 400,
                name: 'ValidationError',
            });
        }

        const userUpdates = userUpdateParseRes.data

        // Remove fields that should not be updated by user
        delete userUpdates.id
        delete userUpdates.email
        delete userUpdates.emailVerified
        delete userUpdates.type
        delete userUpdates.createdAt

        const updatedUser = await UserService.updateUser(
            user.id,
            userUpdates,
        );

        delete updatedUser.password

        ctx.status = 200;
        ctx.body = { updatedUser };
    },

    async deleteUserByToken(ctx: Context): Promise<void> {
        ctx.status = 501
        ctx.body = { error: 'Not Implemented' }
    },
}
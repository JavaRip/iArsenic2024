import { KnownError } from '../errors'
import { Context } from 'koa'
import { UserService } from '../services'
import { UserSchema } from '../models'

export const UserController = {
    async getUser(ctx: Context): Promise<void> {
        const auth = ctx.state.auth

        // if (!auth.token) {
        //     throw new KnownError({
        //         message: 'Unauthorized',
        //         code: 403,
        //         name: 'UnauthorizedError',
        //     });
        // }

        const userId = ctx.params.userId;

        const user = await UserService.getById(auth.user, userId)

        ctx.status = 200;
        ctx.body = user;
    },

    async updateUser(ctx: Context): Promise<void> {
        const auth = ctx.state.auth

        if (!auth.token) {
            throw new KnownError({
                message: 'Unauthorized',
                code: 403,
                name: 'UnauthorizedError',
            });
        }

        const userId = ctx.params.userId;

        const parsed = UserSchema.partial().safeParse(ctx.request.body);

        let updatedUser
        if (parsed.success) {
            updatedUser = await UserService.updateUser(
                auth,
                userId,
                parsed.data,
            )
        }

        ctx.status = 200
        ctx.body = updatedUser
    },

    async getAllUsers(ctx: Context): Promise<void> {
        const auth = ctx.state.auth
        const users = await UserService.getAllUsers(auth)
        ctx.status = 200
        ctx.body = { users }
    },

    async getAvatarUploadUrl(ctx: Context): Promise<void> {
        const auth = ctx.state.auth
        const userId = ctx.params.userId
        const body = ctx.request.body as { contentType?: string }

        if (!body.contentType || !body.contentType.startsWith('image/')) {
            throw new KnownError({
                message: 'Invalid or missing content type',
                code: 400,
                name: 'ValidationError',
            })
        }

        const { signedUrl, path } = await UserService.getAvatarUploadUrl(auth, userId, body.contentType)
        ctx.status = 200
        ctx.body = { url: signedUrl, path }
    },

    async confirmAvatarUpload(ctx: Context): Promise<void> {
        const auth = ctx.state.auth
        const userId = ctx.params.userId
        const body = ctx.request.body as { path?: string }

        if (!body.path || typeof body.path !== 'string') {
            throw new KnownError({
                message: 'Avatar path is required',
                code: 400,
                name: 'ValidationError',
            })
        }

        const updatedUser = await UserService.confirmAvatarUpload(auth, userId, body.path)
        ctx.status = 200
        ctx.body = updatedUser
    },

    async deleteUser(/*ctx: Context*/): Promise<void> {
        throw new KnownError({
            message: 'Delete user unimplemented',
            code: 501,
            name: 'Unimplemented',
        })
    },
}
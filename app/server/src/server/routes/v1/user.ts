import Router from '@koa/router'
import { UserController } from '../../controllers'
import { useAuth } from '../../middleware'

const user = new Router()

user.get('/users', useAuth, async ctx => UserController.getAllUsers(ctx))
user.get('/user/:userId', useAuth, async ctx => UserController.getUser(ctx))
user.patch('/user/:userId', useAuth, async (ctx) => UserController.updateUser(ctx))
user.post('/user/:userId/avatar-upload-url', useAuth, async ctx => UserController.getAvatarUploadUrl(ctx))
user.post('/user/:userId/confirm-avatar-upload', useAuth, async ctx => UserController.confirmAvatarUpload(ctx))
user.delete('/user/:userId', useAuth, async (/*ctx*/) => UserController.deleteUser(/*ctx*/))

export default user
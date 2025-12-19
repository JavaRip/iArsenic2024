import Router from '@koa/router'
import { UserController } from '../../controllers'
import { useAuth } from '../../middleware'

const user = new Router()

user.get('/user/:userId', useAuth, async ctx => UserController.getUser(ctx))
user.patch('/user/:userId', useAuth, async (/*ctx*/) => UserController.updateUser(/*ctx*/))
user.delete('/user/:userId', useAuth, async (/*ctx*/) => UserController.deleteUser(/*ctx*/))

export default user
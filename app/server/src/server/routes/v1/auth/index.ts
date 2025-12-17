import Router from '@koa/router'
import { AuthController } from '../../../controllers'
import { useAuth } from '../../../middleware'

const self = new Router({ prefix: '/auth' })

self.get('/refresh', useAuth, async ctx => AuthController.refresh(ctx))
self.get('/verify-email/:token', async ctx => AuthController.verifyEmail(ctx))
self.post('/forgot-password', async ctx => AuthController.forgotPassword(ctx))
self.post('/login', async ctx => AuthController.login(ctx))
self.post('/register', async ctx => AuthController.register(ctx))
self.post('/reset-password/:token', async ctx => AuthController.forgotPassword(ctx))

export default self
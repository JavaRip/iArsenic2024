import { errorHandler } from '../../middleware'
import actionItem from './action-item'
import auth from './auth'
import geodata from './geodata'
import healthcheck from './healthcheck'
import Router from '@koa/router'
import self from './self'
import token from './token'
import user from './user'
import well from './well'

const routes = new Router({ prefix: '/api/v1' })

// mount the middleware to apply to all of v1
routes.use(errorHandler)

// mount the sub routes
routes.use(actionItem.routes())
routes.use(auth.routes())
routes.use(geodata.routes())
routes.use(healthcheck.routes())
routes.use(self.routes())
routes.use(token.routes())
routes.use(user.routes())
routes.use(well.routes())

routes.all('(.*)', ctx => {
    ctx.status = 404;
    ctx.body = { message: 'Path not found' }
})

export default routes
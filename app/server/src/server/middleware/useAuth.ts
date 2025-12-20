import { ParameterizedContext, Next } from 'koa'
import { TokenRepo, UserRepo } from '../repositories'

export default async function useAuth(
    ctx: ParameterizedContext,
    next: Next
) {
    const bearerAuth = ctx.request.headers['authorization'] as string
    const apiKey = ctx.request.headers['x-api-key'] as string

    let tokenId: string | undefined;
    let tokenType: 'access' | 'api-key' | 'refresh' | undefined;

    if (bearerAuth) {
        tokenId = bearerAuth.split(' ')[1];
        tokenType = 'access';
    } else if (apiKey) {
        tokenId = apiKey;
        tokenType = 'api-key';
    } else if (ctx.path === '/api/v1/auth/refresh') {
        tokenId = ctx.cookies.get('__session');
        tokenType = 'refresh';
    }

    if (!tokenId) {
        ctx.state.auth = { user: { type: 'guest' } };
        await next();
        return;
    }

    // Fetch token from DB
    const token = await TokenRepo.findById(tokenId);
    if (!token) throw Error('token not found');

    // Validate type matches expected type
    if (token.type !== tokenType) {
        throw Error(`unexpected token type ${token.type}`);
    }

    // Check expiration
    if (token.expiresAt < new Date() || token.revokedAt != null) {
        ctx.status = 401;
        ctx.body = { error: true, result: 'Unauthorized' };
        return;
    }

    // Load user
    const user = await UserRepo.findById(token.userId);
    if (!user) throw Error('user not found');

    ctx.state.auth = { token, user };
    await next();
}

import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
@Injectable()
export class LocalGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = (await super.canActivate(context)) as boolean;
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    await super.logIn(req);
    return result;
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const gqlReq = ctx.getContext().req;
    if (gqlReq) {
        const  email = ctx.getArgs()['userData'].email
        const  password = ctx.getArgs()['userData'].password
        gqlReq.body = { email, password };
    return gqlReq;
    }
  }
}

import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { LoggedInGuard } from './logged-in.guard';

@Injectable()
export class AdminGuard extends LoggedInGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = (await super.canActivate(context)) as boolean;
    const ctx = GqlExecutionContext.create(context);
    const gqlReq = ctx.getContext().req;    
    return result && gqlReq.session.passport.user.role === 'admin';
  }
}
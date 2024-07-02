// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';


// @Injectable()
// export class LoggedInGuard implements CanActivate {
//   canActivate(context: ExecutionContext) {
//     console.log(context)
//     return context.switchToHttp().getRequest().isAuthenticated();
//   }
// }

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';


@Injectable()
export class LoggedInGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    let gqlContext = context.getArgByIndex(2).req
    console.log("HIT LOGIN GUARD")
    console.log(gqlContext.isAuthenticated())
    return gqlContext.isAuthenticated();
  }
}
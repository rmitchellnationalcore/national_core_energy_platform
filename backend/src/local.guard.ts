// import { ExecutionContext, Injectable } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';

// @Injectable()
// export class LocalGuard extends AuthGuard('local') {
//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const result = (await super.canActivate(context)) as boolean;
//     await super.logIn(context.switchToHttp().getRequest());
//     return result;
//   }
// }

// import { ExecutionContext, Injectable } from '@nestjs/common';
// import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
// import { GqlExecutionContext } from '@nestjs/graphql';
// import { AuthGuard } from '@nestjs/passport';
// import { Request } from 'express';

// @Injectable()
// export class LocalGuard extends AuthGuard('local') {
//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const ctx = GqlExecutionContext.create(context)
//     const { req } = ctx.getContext()
//     // const gqlContext = context.getArgByIndex(2)
//     // const request: Request = gqlContext.req
//     console.log("BBBB")

//     const result = (await super.canActivate(new ExecutionContextHost([req]))) as boolean;
//     console.log(result)
//     await super.logIn(req);
//     return result;
//   }
// }

// import { ExecutionContext, Injectable } from '@nestjs/common';
// import { GqlExecutionContext } from '@nestjs/graphql';
// import { AuthGuard } from '@nestjs/passport';

// @Injectable()
// export class LocalGuard extends AuthGuard('local') {
//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     console.log(context)
//     console.log("second part")

//     const result = (await super.canActivate(context)) as boolean;
//     console.log("PASSED RESULT")
    
//     await super.logIn(context.);
//     return result;
//   }
// }



// import { ExecutionContext, Injectable } from '@nestjs/common';
// import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
// import { AuthGuard } from '@nestjs/passport';

// @Injectable()
// export class LocalGuard extends AuthGuard('local') {
//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     // console.log("Context is")
//     // console.log(context)
//     const result = (await super.canActivate(context)) as boolean;
//     console.log(result)
//     console.log("Did not activate")
//     await super.logIn(context.switchToHttp().getRequest());
//     return result;
//   }

//   override getRequest(context: ExecutionContext) {
//     switch (context.getType<GqlContextType>()) {
//       case 'graphql':
//         const ctx = GqlExecutionContext.create(context);
//         return ctx.getContext().req;
//       default: // 'http' | 'ws' | 'rpc'
//         return context.switchToHttp().getRequest();
//     }
//   }
// }

// import { ExecutionContext, Injectable } from '@nestjs/common';
// import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
// import { GqlExecutionContext } from '@nestjs/graphql';
// import { AuthGuard } from '@nestjs/passport';
// import { Request } from 'express';

// @Injectable()
// export class LocalGuard extends AuthGuard('local') {
//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const ctx = GqlExecutionContext.create(context)
//     const { req } = ctx.getContext()
//     // const gqlContext = context.getArgByIndex(2)
//     // const request: Request = gqlContext.req
//     console.log("BBBB")

//     const result = (await super.canActivate(new ExecutionContextHost([req]))) as boolean;
//     console.log(result)
//     await super.logIn(req);
//     return result;
//   }
// }

// import { ExecutionContext, Injectable } from '@nestjs/common';
// import { GqlExecutionContext } from '@nestjs/graphql';
// import { AuthGuard } from '@nestjs/passport';

// @Injectable()
// export class LocalGuard extends AuthGuard('local') {
//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     console.log(context)
//     console.log("second part")

//     const result = (await super.canActivate(context)) as boolean;
//     console.log("PASSED RESULT")
    
//     await super.logIn(context.);
//     return result;
//   }
// }



// import { ExecutionContext, Injectable } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';

// @Injectable()
// export class LocalGuard extends AuthGuard('local') {
//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const ctx = GqlExecutionContext.create(context);
//     const result = (await super.canActivate(context)) as boolean;

//     const request = ctx.getContext().req;

//     await new Promise<void>((resolve, reject) => 
//         request.logIn(request.user, (err: any) => (err ? reject(err) : resolve())));
//     return result;
//   }

//     override getRequest(context: ExecutionContext) {
//     switch (context.getType<GqlContextType>()) {
//       case 'graphql':
//         const ctx = GqlExecutionContext.create(context);
//         return ctx.getContext().req;
//       default: // 'http' | 'ws' | 'rpc'
//         return context.switchToHttp().getRequest();
//     }
//   }
// }


import { ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GqlContextType, GqlExecutionContext } from "@nestjs/graphql";
import { Observable } from "rxjs";
import { AuthService } from "./auth/auth.service"
import { ExecutionContextHost } from "@nestjs/core/helpers/execution-context-host";
// @Injectable()
// export class LocalGuard extends AuthGuard('local') {
//     constructor() {
//         super();
//       }
//       getRequest(context: ExecutionContext) {
//         const ctx = GqlExecutionContext.create(context);
//         const req = ctx.getContext().req;
//         req.body = ctx.getArgs();
//         return req;
//       }

@Injectable()
export class LocalGuard extends AuthGuard('local') {


    //     constructor() {
    //     super();
    //   }
    //   getRequest(context: ExecutionContext) {
    //     const ctx = GqlExecutionContext.create(context);
    //     const req = ctx.getContext().req;
    //     req.body = ctx.getArgs();
    //     return req;
    //   }

  async canActivate(context: ExecutionContext): Promise<boolean> {


    const ctx = context.getType() === 'http' ? context.switchToHttp().getRequest() : GqlExecutionContext.create(context).getContext().req;
    console.log(ctx)
    const result = (await super.canActivate(new ExecutionContextHost([ctx]))) as boolean;

    // const result = (await super.canActivate(context)) as boolean;
    console.log("MADE IT PAST RESULT")
    // const ctx = GqlExecutionContext.create(context);

    // const result = (await super.canActivate(GqlExecutionContext.create(context))) as boolean;
    // const { req } = ctx.getContext();
    await super.logIn(context.switchToHttp().getRequest());
    return result;
  }


//   getRequest(context: ExecutionContext) {
//     const ctx = GqlExecutionContext.create(context);
//     const gqlReq = ctx.getContext().req;
//     if (gqlReq) {
//       const { authCredentialsInput } = ctx.getArgs();
//       gqlReq.body = authCredentialsInput;
//       return gqlReq;
//     }
//   }
}




    // async canActivate(context: ExecutionContext): Promise<boolean> {

    //     const ctx = GqlExecutionContext.create(context);
    //     const myArgs = ctx.getArgByIndex(2);
    //     console.log(ctx)
    //     const customStructure = {
    //         ...myArgs?.req,
    //         ...myArgs?.res,
    //         switchToHttp() {
    //             const getRequest = () => {
    //               return myArgs?.req;
    //             };
    //             const getResponse = () => {
    //               return myArgs?.res;
    //             };
          
    //             return { getRequest, getResponse };
    //           },
    //         };
    //         console.log("THIS IS THE CUSTOM STRUCTURE")
    //     console.log(customStructure)
    //     const result = (await super.canActivate(customStructure)) as boolean;

    //     console.log("PASSED RESULT")
    //     const request = ctx.getContext().req;
    //     await new Promise<void>((resolve, reject) => 
    //     request.logIn(request.session, (err: any) => (err ? reject(err) : resolve())));

    //     return result;
        
    // }

    // async canActivate(context: ExecutionContext): Promise<boolean> {
    //     const ctx = GqlExecutionContext.create(context);
    //     const result = (await super.canActivate(ctx)) as boolean;
        
    //     const req = ctx.getContext().req;
    //     console.log("MADE IT FURTHER????")
    //     await new Promise<void>((resolve, reject) => 
    //     req.logIn(req.session, (err: any) => (err ? reject(err) : resolve())));

    //     return result;

        // const ctx = GqlExecutionContext.create(context);
        // const myArgs = ctx.getArgByIndex(2);
        // console.log(ctx)
        // const customStructure = {
        //     ...myArgs?.req,
        //     ...myArgs?.res,
        //     switchToHttp() {
        //         const getRequest = () => {
        //           return myArgs?.req;
        //         };
        //         const getResponse = () => {
        //           return myArgs?.res;
        //         };
          
        //         return { getRequest, getResponse };
        //       },
        //     };
        //     console.log("THIS IS THE CUSTOM STRUCTURE")
        // console.log(customStructure)
        // const result = (await super.canActivate(customStructure)) as boolean;

        // console.log("PASSED RESULT")
        // const request = ctx.getContext().req;
        // await new Promise<void>((resolve, reject) => 
        // request.logIn(request.session, (err: any) => (err ? reject(err) : resolve())));

        // return result;
        
  //  }

    

    



//       override getRequest(context: ExecutionContext) {
//     switch (context.getType<GqlContextType>()) {
//       case 'graphql':
//         const ctx = GqlExecutionContext.create(context);
//         return ctx.getContext().req;
//       default: // 'http' | 'ws' | 'rpc'
//         return context.switchToHttp().getRequest();
//     }
//   }


//     handleRequest(err, user, info, context) {
//         if (err || !user) {
//             throw err || new UnauthorizedException
//         }
//         return user
//     }
// }
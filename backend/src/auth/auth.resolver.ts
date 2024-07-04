import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';

import { LocalGuard } from '../local.guard';
import { AuthService } from './auth.service';
import { LoginUserDto } from './models/login-user.dto';
import { RegisterUserDto } from './models/register-user.dto';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Request } from 'express';
import { loginUserInput, loginUserReturnType, registerUserInput, registerUserReturnType, returnUserType } from 'src/types';

@Resolver()
export class AuthResolver{
    constructor(private readonly authService: AuthService) {}

    @Mutation((returns) => registerUserReturnType)
    async registerUser(
        @Args('userData') user: registerUserInput
    ) {
        const returnedValue = this.authService.registerUser(user);
        console.log(returnedValue)
        return returnedValue
    }

    @UseGuards(LocalGuard)
    @Mutation((returns) => returnUserType)
    async loginUser(
        @Args('userData') user: loginUserInput,
        @Context() ctx: any,
    ) {
        console.log("SESSIONS IS ")
        console.log(ctx.res)
        console.log("THAT'S THE SESSION BEING RETURNED!") 
        console.log(ctx.req.session.cookie   )
        ctx.res.cookie('rt', ctx.req.session)
        const {id, firstName, lastName, email, role} = ctx.req.user  
    //     console.log({
    //         id: id,
    //         firstName: firstName,
    //         lastName: lastName,
    //         email: email,
    //         role: role
    // })   
        return {
            id: id,
            firstName: firstName,
            lastName: lastName,
            email: email,
            role: role
    } 

}
}
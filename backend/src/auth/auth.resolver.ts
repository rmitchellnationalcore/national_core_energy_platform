import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';

import { LocalGuard } from '../local.guard';
import { AuthService } from './auth.service';
import { LoginUserDto } from './models/login-user.dto';
import { RegisterUserDto } from './models/register-user.dto';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { loginUserInput, loginUserReturnType, registerUserInput, registerUserReturnType, returnUserType } from 'src/types';
import { LoggedInGuard } from 'src/logged-in.guard';

@Resolver()
export class AuthResolver{
    constructor(private readonly authService: AuthService) {}

    @Mutation((returns) => registerUserReturnType)
    async registerUser(
        @Args('userData') user: registerUserInput
    ) {
        const returnedValue = this.authService.registerUser(user);
        return returnedValue
    }

    @UseGuards(LocalGuard)
    @Mutation((returns) => returnUserType)
    async loginUser(
        @Args('userData') user: loginUserInput,
        @Context() ctx: any,
    ) {
        const {id, role} = ctx.req.session.passport.user
        const { firstName, lastName, email} = this.authService.findById(id)

        return {
            id: id,
            firstName: firstName,
            lastName: lastName,
            email: email,
            role: role
    }
}
    
    @UseGuards(LoggedInGuard)
    @Mutation(() => Boolean)
    async logOut(
        @Context() ctx: { req: Request, res: Response}
    ): Promise<boolean> {
        return new Promise((resolve, reject) => {
            ctx.req.logout((err) => {
                if (err) {
                    return reject(false)
                }
                ctx.req.session.destroy((err) => {
                    if (err) {
                        return reject(false);
                    }
                })
                
                ctx.res.clearCookie('connect.sid');
                resolve(true)
            })
        })
    }

    @UseGuards(LoggedInGuard)
    @Mutation(() => Boolean)
    async refreshSession(@Context() ctx: { req: Request, res: Response} 
    ): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (ctx.req.session) {
                const user = ctx.req.user
                ctx.req.session.regenerate((err) => {
                    if (err) {
                        return reject(false);
                    }

                    ctx.req.login(user, (loginErr) => {
                        if (loginErr) {
                            return reject(false)
                        }
                    
                
          

                ctx.req.session.cookie.maxAge = 60000;
                ctx.req.session.save((err) => {
                    if (err) {
                       
                        return reject(false);
                    }
                    resolve(true);
                });
            });
        });

            } else {
                reject(false);
            }
        })
    }




}
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
// import { User } from "./users.dto";
// import { UsersService } from "./users.service";
// import { CreateUserInput } from "./users.inputs";
import { Response } from "express";
import { BadRequestException, UseGuards } from "@nestjs/common";
import { LoggedInGuard } from './logged-in.guard';
import { AdminGuard } from './admin.guard';
import { AppService } from './app.service';
import { appResolverMessageType } from "./types";

@Resolver()
export class AppResolver {
    constructor(private readonly appService: AppService) {}

    @Query((returns) => String)
    getPublicMessage(){
        return this.appService.getPublicMessage();
        // return "Hello World!"
    }

    @UseGuards(LoggedInGuard)
    @Query((returns) => String)
    getPrivateMessage(){
        return this.appService.getPrivateMessage();
    }

    @UseGuards(AdminGuard)
    @Query((returns) => String)
    getAdminMessage(){
        return this.appService.getAdminMessage();
    }




}
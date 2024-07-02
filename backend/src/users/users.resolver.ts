import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User } from "./users.dto";
// import { UsersService } from "./users.service";
import { CreateUserInput } from "./users.inputs";
import { Response } from "express";
import { BadRequestException } from "@nestjs/common";

@Resolver()
export class UserResolver
 {
    // constructor(
    //     private usersService: UsersService
    //   ) {}


    @Mutation((returns) => User)
    async CreateUser(
        @Args('createUserData') {fullname, email, password, confirmPassword}: CreateUserInput,
        @Context() context: { res: Response}){
            if (password !== confirmPassword){
                throw new BadRequestException({
                    confirmPassword: 'Password and confirm password do not match.'
                });
            }

    }


    @Query((returns) => User)
    FetchUser(){
        return {
            id: 1,
            fullname: "fullName",
            email: "email@email.com",
            createdAt: new Date(),
            updatedAt: new Date(),
            isAdmin: true,
            password: "password"
        }
    }



    @Mutation((returns) => User)
    DeleteUser(){
        return {
            id: 1,
            fullname: "fullName",
            email: "email@email.com",
            createdAt: new Date(),
            updatedAt: new Date(),
            isAdmin: true,
            password: "password"
        }
    }

    // @Mutation((returns) => User)
    // LoginUser(){
    //     return {
    //         id: 1,
    //         fullname: "fullName",
    //         email: "email@email.com",
    //         createdAt: new Date(),
    //         updatedAt: new Date(),
    //         isAdmin: true,
    //         password: "password"
    //     }
    // }

    // @Mutation((returns) => User)
    // LogoutUser(){
    //     return {
    //         id: 1,
    //         fullname: "fullName",
    //         email: "email@email.com",
    //         createdAt: new Date(),
    //         updatedAt: new Date(),
    //         isAdmin: true,
    //         password: "password"
    //     }
    // }

    // @Mutation((returns) => User)
    // RefreshToken(){
    //     return {
    //         id: 1,
    //         fullname: "fullName",
    //         email: "email@email.com",
    //         createdAt: new Date(),
    //         updatedAt: new Date(),
    //         isAdmin: true,
    //         password: "password"
    //     }
    // }

    @Mutation((returns) => User)
    UpdateUser(){
        return {
            id: 1,
            fullname: "fullName",
            email: "email@email.com",
            createdAt: new Date(),
            updatedAt: new Date(),
            isAdmin: true,
            password: "password"
        }
    }

}
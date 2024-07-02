import { InputType, Field, Int } from "@nestjs/graphql";

@InputType()
export class CreateUserInput {
    @Field()
    fullname: string;

    @Field()
    email: string;

    @Field()
    password: string;

    @Field()
    confirmPassword: string;
}

@InputType()
export class DeleteUserInput {
    @Field()
    email: string;
}

@InputType()
export class UpdateUserInput {

    @Field(type => Int)
    userId: number

    @Field()
    fullname: string;

    @Field()
    email: string;

    @Field()
    isAdmin: boolean

    @Field()
    password: string

    @Field()
    confirmPassword: string;

    @Field()
    verifyEmail: boolean
}

@InputType()
export class FetchUserInput {
    @Field({nullable: true})
    fullname?: string;

    @Field({nullable: true})
    email?: string;
}

// @InputType()
// export class LogInUser {

// }


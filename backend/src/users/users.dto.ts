import { Field, Int, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class User {

    @Field(type => Int)
    id: number;

    @Field()
    fullname: string;

    @Field()
    email: string;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;

    @Field()
    isAdmin: boolean;

    @Field({ nullable: true})
    emailVerifiedAt?: Date;

    @Field()
    password: string;
}
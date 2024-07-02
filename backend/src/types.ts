import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class appResolverMessageType {

    @Field()
    value: string;
}

@ObjectType()
export class registerUserReturnType {
    
    @Field((type) => Int)
    id: number;

    @Field()
    firstName: string;
    @Field()
    lastName: string;
    @Field()
    email: string;
    @Field()
    role: string;
      
}

// @ObjectType()
// export class 


@ObjectType()
export class loginUserReturnType {

    @Field()
    value: string;

}

@InputType()
export class registerUserInput {
    @Field()
    firstName: string;
    @Field()
    lastName: string;
    @Field()
    email: string;
    @Field()
    password: string;
    @Field()
    confirmationPassword: string;
    @Field()
    role: string;

}


@InputType()
export class loginUserInput {
    @Field()
    email: string;
    @Field()
    password: string;
}
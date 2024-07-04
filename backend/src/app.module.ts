import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { Inject, Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
const RedisStore = require("connect-redis").default;
import * as session from 'express-session';
import * as passport from 'passport';
import { createClient } from 'redis';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserResolver } from './users/users.resolver';
import { AuthModule } from './auth/auth.module';
// import { REDIS, RedisModule } from './redis/redis.constants';
import { REDIS } from './redis/redis.constants';
import { RedisModule } from './redis/redis.module';
import { AppResolver } from './app.resolver';
import { AuthResolver } from './auth/auth.resolver';
import { AuthService } from './auth/auth.service';

type RedisClient = ReturnType<typeof createClient>;


@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    context: ({ req, res}) => ({ req, res}),
    playground: {
      settings: {
        'request.credentials': 'include'
      }
    },
  }), 
  UsersModule,
  AuthModule, RedisModule],
  controllers: [],
  providers: [PrismaService, AuthService, AppService, Logger, UserResolver, AppResolver, AuthResolver, AppController],
})
export class AppModule implements NestModule {
  constructor(@Inject(REDIS) private readonly redis: RedisClient) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          store: new RedisStore({ client: this.redis }),          saveUninitialized: false,
          secret: 'sup3rs3cr3t',
          resave: false,
          cookie: {
            sameSite: true,
            httpOnly: false,
            maxAge: 60000,
          },
        }),
        passport.initialize(),
        passport.session(),
      )
      .forRoutes('*');
  }
}



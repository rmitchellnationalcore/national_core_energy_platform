// import { NestFactory } from '@nestjs/core';
// import { Logger } from '@nestjs/common';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   const logger = app.get(Logger);
//   await app.listen(3000);
//   logger.log(`Application listening at ${await app.getUrl()}`);
// }
// bootstrap();

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    credentials: true,
    allowedHeaders: [
      'Accept',
      'Authorization',
      'Content-Type',
      'X-Requested-With',
      'apollo-require-preflight',
    ],
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  })
  app.use(cookieParser())
  const logger = app.get(Logger);
  await app.listen(3000);
  logger.log(`Application listening at ${await app.getUrl()}`);
};

bootstrap();
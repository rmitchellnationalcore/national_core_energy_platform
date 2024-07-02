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

import { AppModule } from './app.module';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(Logger);
  await app.listen(3000);
  logger.log(`Application listening at ${await app.getUrl()}`);
};

bootstrap();
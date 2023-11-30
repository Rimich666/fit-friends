/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import {ConfigService} from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = '';
  app.setGlobalPrefix(globalPrefix);
  const configService = app.get(ConfigService);
  const logger = new Logger('Users main');
  logger.log(configService);
  logger.log(`Users PORT: ${configService.getOrThrow('PORT')}`);

  const port = configService.get<number>('PORT');
  await app.listen(port);
  logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
  logger.log(
    `🎯  Current mode: ${configService.get('application.environment')}`
  );
}

bootstrap();

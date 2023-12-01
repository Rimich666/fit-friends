/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import {ConfigService} from '@nestjs/config';

async function bootstrap() {
  const GLOBAL_PREFIX = '';
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(GLOBAL_PREFIX);
  const configService = app.get(ConfigService);
  const logger = new Logger('Users main');
  const port = configService.get<number>('PORT');
  await app.listen(port);
  logger.log(
    `🚀 Application is running on: http://localhost:${port}/${GLOBAL_PREFIX}`
  );
  logger.log(
    `🎯  Current mode: ${configService.get('application.environment')}`
  );
}

bootstrap();

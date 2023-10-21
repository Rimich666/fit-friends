/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */


import { AppModule } from './app/app.module';
import {CommandFactory} from 'nest-commander';
import {Logger} from '@nestjs/common';

async function bootstrap() {
  await CommandFactory.run(AppModule, new Logger());
  Logger.log('И всё таки она вертится');
}

bootstrap();

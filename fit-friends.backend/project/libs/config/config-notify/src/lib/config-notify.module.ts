import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {appConfig, EnvPaths, jwtConfig, mailConfig, mongoConfig, rabbitConfig} from '@project/configurations';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, mailConfig, rabbitConfig, mongoConfig, jwtConfig],
      envFilePath: EnvPaths.notify
    }),
  ],
})
export class ConfigNotifyModule {}

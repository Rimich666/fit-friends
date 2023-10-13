import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {appConfig, appsConfig, EnvPaths, httpConfig, rabbitConfig} from '@project/configurations';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, appsConfig, httpConfig, rabbitConfig],
      envFilePath: EnvPaths.bff
    }),
  ],
})
export class ConfigBffModule {}

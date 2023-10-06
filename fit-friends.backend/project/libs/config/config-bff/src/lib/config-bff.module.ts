import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {appConfig, appsConfig, EnvPaths, httpConfig} from '@project/configurations';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, appsConfig, httpConfig],
      envFilePath: EnvPaths.bff
    }),
  ],
})
export class ConfigBffModule {}

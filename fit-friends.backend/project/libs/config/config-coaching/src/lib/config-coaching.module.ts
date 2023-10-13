import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {appConfig, EnvPaths, jwtConfig, rabbitConfig} from '@project/configurations';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, jwtConfig, rabbitConfig],
      envFilePath: EnvPaths.coaching
    }),
  ]
})
export class ConfigCoachingModule {}

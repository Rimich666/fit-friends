import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {appConfig, EnvPaths, jwtUsersConfig, mongoConfig, rabbitConfig} from '@project/configurations';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, mongoConfig, jwtUsersConfig, rabbitConfig],
      envFilePath: EnvPaths.users,
    }),
  ]
})
export class ConfigUsersModule {}

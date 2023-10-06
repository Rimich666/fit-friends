import { Module } from '@nestjs/common';
import {ConfigUsersModule} from '@project/config-users';
import {MongooseModule} from '@nestjs/mongoose';
import {getMongooseOptions} from '@project/modules-options';

@Module({
  imports: [
    ConfigUsersModule,
    MongooseModule.forRootAsync(getMongooseOptions('mongo')),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

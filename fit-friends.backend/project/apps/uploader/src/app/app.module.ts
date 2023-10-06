import { Module } from '@nestjs/common';
import {ConfigUploaderModule} from '@project/config-uploader';
import {MongooseModule} from '@nestjs/mongoose';
import {getMongooseOptions} from '@project/modules-options';

@Module({
  imports: [
    ConfigUploaderModule,
    MongooseModule.forRootAsync(getMongooseOptions('mongo')),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

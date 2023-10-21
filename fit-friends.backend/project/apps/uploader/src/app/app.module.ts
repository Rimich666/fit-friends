import { Module } from '@nestjs/common';
import { ConfigUploaderModule } from '@project/config-uploader';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongooseOptions } from '@project/modules-options';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    ConfigUploaderModule,
    MongooseModule.forRootAsync(getMongooseOptions('mongo')),
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

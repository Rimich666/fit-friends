import { Module } from '@nestjs/common';
import { FillCommand } from './fill.command';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoUriFromEnv } from '@project/util-core';
import { join } from 'path';
import { EnvPaths, ROOT_ENV } from '@project/configurations';
import {
  FitUserModel,
  FitUserSchema,
  FriendsUsersModel,
  FriendUserSchema,
  JoinTrainingModel,
  JoinTrainingSchema,
  NotificationModel,
  NotificationSchema,
} from '@project/fit-users.model';
import { FillRepository } from './fill.repository';
import { Collections } from './collections';
import { Generator } from './generators';
import { FileModel, FileSchema } from '@project/uploader.model';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: FitUserModel.name, schema: FitUserSchema }],
      Collections.users
    ),
    MongooseModule.forFeature(
      [{ name: FriendsUsersModel.name, schema: FriendUserSchema }],
      Collections.users
    ),
    MongooseModule.forFeature(
      [{ name: JoinTrainingModel.name, schema: JoinTrainingSchema }],
      Collections.users
    ),
    MongooseModule.forFeature(
      [{ name: NotificationModel.name, schema: NotificationSchema }],
      Collections.users
    ),
    MongooseModule.forRoot(getMongoUriFromEnv(join(ROOT_ENV, EnvPaths.users)), {
      connectionName: Collections.users,
    }),
    MongooseModule.forRoot(
      getMongoUriFromEnv(join(ROOT_ENV, EnvPaths.uploader)),
      {
        connectionName: Collections.files,
      }
    ),
    MongooseModule.forFeature(
      [{ name: FileModel.name, schema: FileSchema }],
      Collections.files
    ),
    PrismaModule,
  ],
  controllers: [],
  providers: [FillCommand, FillRepository, Generator],
})
export class AppModule {}

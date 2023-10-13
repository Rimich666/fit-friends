import { Module } from '@nestjs/common';
import { JoinTrainingController } from './join-training.controller';
import { JoinTrainingService } from './join-training.service';
import { JoinTrainingRepository } from './join-training.repository';
import {MongooseModule} from '@nestjs/mongoose';
import {JoinTrainingSchema} from '@project/fit-users.model';
import {JoinTrainingModel} from '@project/fit-users.model';
import {JwtAccessStrategy} from '@project/util-core';
import {FitUsersModule} from '../fit-users/fit-users.module';
import {NotificationModule} from '../notification/notification.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JoinTrainingModel.name, schema: JoinTrainingSchema },
    ]),
    FitUsersModule,
    NotificationModule
  ],
  controllers: [JoinTrainingController],
  providers: [JoinTrainingService, JoinTrainingRepository, JwtAccessStrategy],
})
export class JoinTrainingModule {}

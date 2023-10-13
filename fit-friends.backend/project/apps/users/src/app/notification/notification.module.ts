import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { NotificationRepository } from './notification.repository';
import {MongooseModule} from '@nestjs/mongoose';
import {NotificationModel, NotificationSchema} from '@project/fit-users.model';
import {JwtAccessStrategy} from '@project/util-core';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: NotificationModel.name, schema: NotificationSchema },
    ]),
  ],
  controllers: [NotificationController],
  providers: [NotificationService, NotificationRepository, JwtAccessStrategy],
  exports: [NotificationService]
})
export class NotificationModule {}

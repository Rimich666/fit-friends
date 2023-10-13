import { Module } from '@nestjs/common';
import { EmailSubscriberController } from './email-subscriber.controller';
import { EmailSubscriberService } from './email-subscriber.service';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import {MongooseModule} from '@nestjs/mongoose';
import {SubscriberModel, SubscriberSchema} from '@project/notify.model';
import {JwtAccessStrategy} from '@project/util-core';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SubscriberModel.name, schema: SubscriberSchema },
    ]),
  ],
  controllers: [EmailSubscriberController],
  providers: [EmailSubscriberService, EmailSubscriberRepository, JwtAccessStrategy],
  exports: [EmailSubscriberRepository]
})
export class EmailSubscriberModule {}

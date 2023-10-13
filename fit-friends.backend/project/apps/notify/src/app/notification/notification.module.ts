import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { NotificationRepository } from './notification.repository';
import {MongooseModule} from '@nestjs/mongoose';
import {EmailNotificationModel, EmailNotificationSchema} from '@project/notify.model';
import {RabbitMQModule} from '@golevelup/nestjs-rabbitmq';
import {getRabbitMQOptions} from '@project/modules-options';
import {MailModule} from '../mail/mail.module';
import {ConfigModule} from '@nestjs/config';
import {EmailSubscriberModule} from '../email-subscriber/email-subscriber.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: EmailNotificationModel.name, schema: EmailNotificationSchema},
    ]),
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('rabbit')
    ),
    MailModule,
    ConfigModule,
    EmailSubscriberModule
  ],
  controllers: [NotificationController],
  providers: [NotificationService, NotificationRepository],
})
export class NotificationModule {}

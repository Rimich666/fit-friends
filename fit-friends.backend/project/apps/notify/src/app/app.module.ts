import { Module } from '@nestjs/common';
import { ConfigNotifyModule } from '@project/config-notify';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongooseOptions } from '@project/modules-options';
import { EmailSubscriberModule } from './email-subscriber/email-subscriber.module';
import { NotificationModule } from './notification/notification.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigNotifyModule,
    MongooseModule.forRootAsync(getMongooseOptions('mongo')),
    EmailSubscriberModule,
    NotificationModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

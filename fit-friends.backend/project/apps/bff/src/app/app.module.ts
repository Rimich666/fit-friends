import { Module } from '@nestjs/common';
import { ConfigBffModule } from '@project/config-bff';
import { NotifyModule } from './notify/notify.module';
import { AuthenticationController } from './authentication.controller';
import { RefreshTokenController } from './refresh-token.controller';
import { FitUsersController } from './fit-users.controller';
import { FriendsController } from './friends.controller';
import { JoinTrainingController } from './join-training.controller';
import { NotificationController } from './notification.controller';
import { BalanceController } from './balance.controller';
import { OrderController } from './order.controller';
import { TrainingController } from './training.controller';
import { EmailSubscriberController } from './email-subscriber.controller';
import { BffService } from './bff.service';
import {HttpModule} from '@nestjs/axios';
import {getHttpOptions} from '@project/modules-options';

@Module({
  imports: [
    ConfigBffModule,
    HttpModule.registerAsync(getHttpOptions('http')),
    NotifyModule
  ],
  controllers: [
    AuthenticationController,
    RefreshTokenController,
    FitUsersController,
    FriendsController,
    JoinTrainingController,
    NotificationController,
    BalanceController,
    OrderController,
    TrainingController,
    EmailSubscriberController,
  ],
  providers: [BffService],
})
export class AppModule {}

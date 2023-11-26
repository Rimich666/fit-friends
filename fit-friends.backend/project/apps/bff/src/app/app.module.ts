import { Module } from '@nestjs/common';
import { ConfigBffModule } from '@project/config-bff';
import { NotifyModule } from './notify/notify.module';
import { AuthenticationController } from './authentication/authentication.controller';
import { FitUsersController } from './fit-users/fit-users.controller';
import { FriendsController } from './friends.controller';
import { JoinTrainingController } from './join-training.controller';
import { NotificationController } from './notification.controller';
import { BalanceController } from './balance.controller';
import { OrderController } from './order.controller';
import { TrainingController } from './training/training.controller';
import { EmailSubscriberController } from './email-subscriber.controller';
import { BffService } from './bff.service';
import { HttpModule } from '@nestjs/axios';
import { getHttpOptions } from '@project/modules-options';
import { FeedbackController } from './feedback.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { Static } from '@project/shared-constants';
import { AuthenticationService } from './authentication/authentication.service';
import { FitUsersService } from './fit-users/fit-users.service';
import { TrainingService } from './training/training.service';
import { PurchasesController } from './purchases.controller';
import { CertificatesController } from './certificates.controller';

@Module({
  imports: [
    ConfigBffModule,
    HttpModule.registerAsync(getHttpOptions('http')),
    NotifyModule,
    ServeStaticModule.forRootAsync({
      useFactory: () => {
        const rootPath = Static.ROOT_PATH;
        const serveRoot = Static.SERVE_ROOT;
        return [
          {
            rootPath,
            serveRoot,
            serveStaticOptions: {
              fallthrough: true,
              etag: true,
            },
          },
        ];
      },
    }),
  ],
  controllers: [
    AuthenticationController,
    FitUsersController,
    FriendsController,
    JoinTrainingController,
    NotificationController,
    BalanceController,
    OrderController,
    TrainingController,
    EmailSubscriberController,
    FeedbackController,
    PurchasesController,
    CertificatesController,
  ],
  providers: [
    BffService,
    AuthenticationService,
    FitUsersService,
    TrainingService,
  ],
})
export class AppModule {}

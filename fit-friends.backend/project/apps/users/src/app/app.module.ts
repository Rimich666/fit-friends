import { Module } from '@nestjs/common';
import { ConfigUsersModule } from '@project/config-users';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongooseOptions } from '@project/modules-options';
import { AuthenticationModule } from './authentication/authentication.module';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';
import { FitUsersModule } from './fit-users/fit-users.module';
import { FriendsModule } from './friends/friends.module';
import { NotificationModule } from './notification/notification.module';
import { JoinTrainingModule } from './join-training/join-training.module';

@Module({
  imports: [
    ConfigUsersModule,
    MongooseModule.forRootAsync(getMongooseOptions('mongo')),
    AuthenticationModule,
    RefreshTokenModule,
    FitUsersModule,
    NotificationModule,
    FriendsModule,
    NotificationModule,
    JoinTrainingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

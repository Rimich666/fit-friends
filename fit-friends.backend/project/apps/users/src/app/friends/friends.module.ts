import { Module } from '@nestjs/common';
import { FriendsController } from './friends.controller';
import { FriendsService } from './friends.service';
import { FriendsRepository } from './friends.repository';
import {MongooseModule} from '@nestjs/mongoose';
import {FriendsUsersModel} from '@project/fit-users.model';
import {FriendUserSchema} from '@project/fit-users.model';
import {JwtAccessStrategy} from '@project/util-core';
import {FitUsersModule} from '../fit-users/fit-users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FriendsUsersModel.name, schema: FriendUserSchema },
    ]),
    FitUsersModule
  ],
  controllers: [FriendsController],
  providers: [FriendsService, FriendsRepository, JwtAccessStrategy],
})
export class FriendsModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FitUserModel, FitUserSchema } from '@project/fit-users.model';
import { FitUsersController } from './fit-users.controller';
import { FitUsersService } from './fit-users.service';
import { FitUsersRepository } from './fit-users.repository';
import {JwtAccessStrategy} from '@project/util-core';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FitUserModel.name, schema: FitUserSchema },
    ]),
  ],
  controllers: [FitUsersController],
  providers: [FitUsersService, FitUsersRepository, JwtAccessStrategy],
  exports: [FitUsersRepository, FitUsersService]
})
export class FitUsersModule {}

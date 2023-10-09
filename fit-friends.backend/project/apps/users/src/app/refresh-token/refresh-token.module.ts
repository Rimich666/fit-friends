import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RefreshTokenModel,
  RefreshTokenSchema,
} from '@project/refresh-token.model';
import { RefreshTokenService } from './refresh-token.service';
import { RefreshTokenRepository } from './refresh-token.repository';
import {FitUsersModule} from '../fit-users/fit-users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RefreshTokenModel.name, schema: RefreshTokenSchema },
    ]),
    FitUsersModule
  ],
  controllers: [],
  providers: [
    RefreshTokenService,
    RefreshTokenRepository,
  ],
  exports: [RefreshTokenService]
})
export class RefreshTokenModule {}

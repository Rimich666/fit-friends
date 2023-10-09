import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import {RefreshTokenModule} from '../refresh-token/refresh-token.module';
import {FitUsersModule} from '../fit-users/fit-users.module';
import {JwtAccessStrategy} from '@project/util-core';
import {LocalStrategy} from './strategies/local.strategy';
import {JwtService} from '@nestjs/jwt';
import {JwtRefreshStrategy} from './strategies/jwt-refresh.strategy';

@Module({
  imports: [RefreshTokenModule, FitUsersModule],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    JwtAccessStrategy,
    JwtRefreshStrategy,
    JwtService,
    LocalStrategy
  ],
})
export class AuthenticationModule {}

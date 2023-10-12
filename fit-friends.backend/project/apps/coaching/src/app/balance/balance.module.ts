import { Module } from '@nestjs/common';
import { BalanceController } from './balance.controller';
import { BalanceService } from './balance.service';
import { BalanceRepository } from './balance.repository';
import {PrismaModule} from '../prisma/prisma.module';
import {TrainingModule} from '../training/training.module';
import {JwtAccessStrategy} from '@project/util-core';

@Module({
  imports: [PrismaModule, TrainingModule],
  controllers: [BalanceController],
  providers: [BalanceService, BalanceRepository, JwtAccessStrategy],
})
export class BalanceModule {}

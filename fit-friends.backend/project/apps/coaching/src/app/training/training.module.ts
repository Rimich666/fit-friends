import { Module } from '@nestjs/common';
import { TrainingController } from './training.controller';
import { TrainingService } from './training.service';
import { TrainingRepository } from './training.repository';
import {PrismaModule} from '../prisma/prisma.module';
import {JwtAccessStrategy} from '@project/util-core';
import {NotifyModule} from '../notify/notify.module';

@Module({
  imports: [PrismaModule, NotifyModule],
  controllers: [TrainingController],
  providers: [TrainingService, TrainingRepository, JwtAccessStrategy],
  exports: [TrainingService]
})
export class TrainingModule {}

import { Module } from '@nestjs/common';
import { TrainingController } from './training.controller';
import { TrainingService } from './training.service';
import { TrainingRepository } from './training.repository';
import {PrismaModule} from '../prisma/prisma.module';
import {JwtAccessStrategy} from '@project/util-core';

@Module({
  imports: [PrismaModule],
  controllers: [TrainingController],
  providers: [TrainingService, TrainingRepository, JwtAccessStrategy],
  exports: [TrainingService]
})
export class TrainingModule {}

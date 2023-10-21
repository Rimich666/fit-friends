import { Module } from '@nestjs/common';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';
import { FeedbackRepository } from './feedback.repository';
import {PrismaModule} from '../prisma/prisma.module';
import {JwtAccessStrategy} from '@project/util-core';
import {TrainingModule} from '../training/training.module';

@Module({
  imports: [PrismaModule, TrainingModule],
  controllers: [FeedbackController],
  providers: [FeedbackService, FeedbackRepository, JwtAccessStrategy],
})
export class FeedbackModule {}

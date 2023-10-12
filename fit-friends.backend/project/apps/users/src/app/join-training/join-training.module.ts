import { Module } from '@nestjs/common';
import { JoinTrainingController } from './join-training.controller';
import { JoinTrainingService } from './join-training.service';
import { JoinTrainingRepository } from './join-training.repository';

@Module({
  controllers: [JoinTrainingController],
  providers: [JoinTrainingService, JoinTrainingRepository],
})
export class JoinTrainingModule {}

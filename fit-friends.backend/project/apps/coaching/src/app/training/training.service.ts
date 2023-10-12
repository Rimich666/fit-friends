import { Injectable } from '@nestjs/common';
import {TrainingRepository} from './training.repository';
import {TrainingEntity} from './training.entity';
import {TrainingInterface} from '@project/shared-types';
import {UpdateTrainingDto} from '@project/shared-dto';
import {QueryFilter} from '../../../../../libs/shared/helpers/src/lib/make-training-query';

@Injectable()
export class TrainingService {
  constructor(
    private readonly trainingRepository: TrainingRepository,
  ) {}

  async createTraining(training: TrainingInterface): Promise<TrainingInterface>{
    return this.trainingRepository.create(new TrainingEntity({
        ...training, createDate: new Date(), rating: 0}));
  }

  async updateTraining(id: number, dto: UpdateTrainingDto) {
    return this.trainingRepository.update(id, new TrainingEntity(dto));
  }

  async getTraining(id: number) {
    return this.trainingRepository.findById(id);
  }

  async getTrainingOrNull(id: number) {
    return this.trainingRepository.findOrNull(id);
  }

  async getTrainings(filters: QueryFilter) {
    return this.trainingRepository.find(filters);
  }

  async checkUser(trainingId: number, userId: string): Promise<boolean> {
    const training = await this.trainingRepository.findById(trainingId);
    return training.coachId === userId;
  }

  async checkTraining(id: number): Promise<boolean> {
    const training = await this.trainingRepository.findOrNull(id);
    return training !== null;
  }
}

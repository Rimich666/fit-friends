import {Get, Injectable, Param, ParseIntPipe, UseGuards} from '@nestjs/common';
import {TrainingRepository} from './training.repository';
import {TrainingEntity} from './training.entity';
import {TrainingInterface} from '@project/shared-types';
import {ForYouFilterDto, UpdateTrainingDto} from '@project/shared-dto';
import {QueryFilter} from '@project/helpers';
import {NotExistsTrainingException} from '@project/util-core';
import {EndPoints} from "@project/shared-constants";
import {UserOnlyGuard} from "@project/shared-enhancers";

@Injectable()
export class TrainingService {
  constructor(
    private readonly trainingRepository: TrainingRepository,
  ) {}

  public async createTraining(training: TrainingInterface): Promise<TrainingInterface>{
    return this.trainingRepository.create(new TrainingEntity({
        ...training, createDate: new Date(), rating: 0}));
  }

  public async updateTraining(id: number, dto: UpdateTrainingDto) {
    return this.trainingRepository.update(id, new TrainingEntity(dto));
  }

  public async getTraining(id: number) {
    const training = await this.trainingRepository.findOrNull(id);
    if (!training) {
      throw new NotExistsTrainingException(id);
    }
    return  training;
  }

  public async getTrainingOrNull(id: number) {
    return this.trainingRepository.findOrNull(id);
  }

  public async getTrainings(filters: QueryFilter) {
    return this.trainingRepository.find(filters);
  }

  public async getForYou(filters: ForYouFilterDto) {
    return this.trainingRepository.getForYou(filters);
  }

  public async getPopular(limit: number) {
    return this.trainingRepository.getPopular(limit);
  }

  public async getSpecial(limit: number) {
    return this.trainingRepository.getSpecial(limit);
  }

  public async checkUser(trainingId: number, userId: string): Promise<boolean> {
    const training = await this.trainingRepository.findById(trainingId);
    return training.coachId === userId;
  }

  public async checkTraining(id: number): Promise<boolean> {
    const training = await this.trainingRepository.findOrNull(id);
    return training !== null;
  }

  public async setRating(trainingId: number, rating: number) {
    await this.trainingRepository.update(trainingId, new TrainingEntity({rating}));
  }

  public async getCount(filters: QueryFilter) {
    return Math.ceil(await this.trainingRepository.count(filters) / filters.limit);
  }

  public async getMaxPrice(coachId?: string) {
    return this.trainingRepository.maxPrice(coachId);
  }
}

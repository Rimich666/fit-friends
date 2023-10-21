import { Injectable } from '@nestjs/common';
import {FeedbackRepository} from './feedback.repository';
import {FeedbackInterface} from '@project/shared-types';
import {FeedbackEntity} from './feedback.entity';
import {FeedbackFilterDto} from '@project/shared-dto';
import {TrainingService} from '../training/training.service';

@Injectable()
export class FeedbackService {
  constructor(
    private readonly feedbackRepository: FeedbackRepository,
    private readonly trainingService: TrainingService
  ) {}

  public async create(feedback: FeedbackInterface) {
    const created =
      await this.feedbackRepository.create(new FeedbackEntity({...feedback, createDate: new Date()}));
    const rating =
      await this.feedbackRepository.getRating(feedback.trainingId);
    await this.trainingService.setRating(feedback.trainingId, rating);
    return this.feedbackRepository.findById(created.id);
  }

  public async getFeedbacks(filter: FeedbackFilterDto) {
    return this.feedbackRepository.getFeedbacks(filter);
  }

  public async getPageCount(filters: FeedbackFilterDto) {
    return this.feedbackRepository.count(filters);
  }

  public async getRating(trainingId: number){
    return this.feedbackRepository.getRating(trainingId);
  }
}

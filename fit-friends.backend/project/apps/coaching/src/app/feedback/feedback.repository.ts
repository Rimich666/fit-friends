import { Injectable } from '@nestjs/common';
import {PrismaService} from '../prisma/prisma.service';
import {FeedbackEntity} from './feedback.entity';
import {FeedbackFilterDto} from '@project/shared-dto';
import {makeFeedbackQueryFilters} from '@project/helpers';

@Injectable()
export class FeedbackRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {
  }

  public async getFeedbacks(queryFilters: FeedbackFilterDto) {
    const filters = makeFeedbackQueryFilters(queryFilters);
    return this.prisma.feedback.findMany(filters);
  }

  public async count(queryFilters: FeedbackFilterDto) {
    return this.prisma.feedback.count({
      where: {trainingId: queryFilters.trainingId},
  });
  }

  public async create(item: FeedbackEntity) {
    return this.prisma.feedback.create({
      data: {...item}
    });
  }

  public async getRating(trainingId: number) {
    return (await this.prisma.feedback.aggregate({
      _avg: {
        rating: true,
      },
      where: {
        trainingId
      }
    }))._avg.rating;
  }

  public async findById(id: number) {
    return this.prisma.feedback.findFirst({
      where:{id},
      include: {training: true}
    });
  }
}

import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards, UseInterceptors,
  UsePipes,
  ValidationPipe, Response
} from '@nestjs/common';
import {ControllerPrefix} from '@project/shared-constants';
import {FeedbackService} from './feedback.service';
import {FeedbackGetInterceptor, JwtAuthGuard, User, UserOnlyGuard} from '@project/shared-enhancers';
import {CreateFeedbackDto, FeedbackFilterDto} from '@project/shared-dto';
import { Response as Res } from 'express';
import {ExistTrainingGuard} from '../exist-training.guard';

@Controller(ControllerPrefix.feedback)
@UseGuards(JwtAuthGuard)
export class FeedbackController {
  constructor(
    private readonly feedbackService: FeedbackService
  ) {}

  @Post('/')
  @UseGuards(UserOnlyGuard, ExistTrainingGuard)
  async create(@Body(ValidationPipe) dto: CreateFeedbackDto, @User() {userId}) {
    return this.feedbackService.create({...dto, authorId: userId});
  }

  @Get('/:id')
  @UsePipes(new ValidationPipe({transform: true}))
  @UseInterceptors(FeedbackGetInterceptor)
  async index(@Param('id') filters: FeedbackFilterDto, @Response() response: Res) {
    const feedbacks = await this.feedbackService.getFeedbacks(filters);
    const count = await this.feedbackService.getPageCount(filters);
    return response.set({ 'List-Size': count }).json(feedbacks);
  }

  @Get('/:id/rating')
  async rating(@Param('id', ParseIntPipe) trainingId: number) {
    return this.feedbackService.getRating(trainingId);
  }
}

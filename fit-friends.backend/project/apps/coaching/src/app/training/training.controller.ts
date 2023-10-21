import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post, Query, Response,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import {TrainingService} from './training.service';
import {CoachOnlyGuard, JwtAuthGuard, Origin, User} from '@project/shared-enhancers';
import {TokenPayloadInterface} from '@project/shared-types';
import {fillObject} from '@project/util-core';
import {TrainingAuthorGuard} from './training-author.guard';
import {
  CoachTrainingFilterDto,
  CreateTrainingDto, EmailNotificationDto,
  SharedTrainingFilterDto,
} from '@project/shared-dto';
import {UpdateTrainingDto} from '@project/shared-dto';
import {TrainingRdo} from '@project/shared-dto';
import {NotifyService} from '../notify/notify.service';
import {ControllerPrefix, EndPoints} from '@project/shared-constants';
import {Response as Res} from 'express';

@Controller(ControllerPrefix.training)
@UseGuards(JwtAuthGuard)
export class TrainingController {
  constructor(
    private readonly trainingService: TrainingService,
    private readonly notifyService: NotifyService
  ) {}

  @Post('/')
  @UseGuards(CoachOnlyGuard)
  @UsePipes(new ValidationPipe({transform: true}))
  async create(@User() {userId, name}: TokenPayloadInterface, @Body() dto: CreateTrainingDto, @Origin() origin: string) {
    const newTraining = await this.trainingService.createTraining({...dto, coachId: userId});
    await this.notifyService.sendNewTraining(fillObject(EmailNotificationDto, {
      ...newTraining, coachName: name, url: `${origin}/${ControllerPrefix.training}/${newTraining.id}`}));
    return fillObject(TrainingRdo, newTraining);
  }

  @Patch('/:id')
  @UseGuards(CoachOnlyGuard, TrainingAuthorGuard)
  @UsePipes(new ValidationPipe({transform: true}))
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTrainingDto) {
    const updatedTraining = await this.trainingService.updateTraining(id, dto);
    return fillObject(TrainingRdo, updatedTraining);
  }

  @Get(`/${EndPoints.coach}`)
  @UseGuards(CoachOnlyGuard)
  @UsePipes(new ValidationPipe({transform: true, whitelist: true}))
  async list(@Query() filters: CoachTrainingFilterDto, @User() {userId}, @Response() response: Res) {
    const trainings = await this.trainingService.getTrainings({...filters, coachId: userId});
    const count = await this.trainingService.getCount({...filters, coachId: userId});
    return response.set({ 'List-Size': count }).json(fillObject(TrainingRdo, trainings));
  }

  @Get('/:id')
  async show(@Param('id', ParseIntPipe) trainingId: number) {
    const training = await this.trainingService.getTraining(trainingId);
    return fillObject(TrainingRdo, training);
  }

  @Get('/')
  @UsePipes(new ValidationPipe({transform: true, whitelist: true}))
  async index(@Query() filters: SharedTrainingFilterDto, @Response() response: Res) {
    const trainings = await this.trainingService.getTrainings(filters);
    const count = await this.trainingService.getCount({...filters});
    return response.set({ 'List-Size': count }).json(fillObject(TrainingRdo, trainings));
  }
}

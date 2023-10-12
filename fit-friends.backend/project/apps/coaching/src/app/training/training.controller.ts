import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post, Query,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import {TrainingService} from './training.service';
import {CoachOnlyGuard, JwtAuthGuard, User} from '@project/shared-enhancers';
import {TokenPayloadInterface} from '@project/shared-types';
import {fillObject} from '@project/util-core';
import {TrainingAuthorGuard} from './training-author.guard';
import {
  CoachTrainingFilterDto,
  CreateTrainingDto,
  SharedTrainingFilterDto,
} from '@project/shared-dto';
import {UpdateTrainingDto} from '@project/shared-dto';
import {TrainingRdo} from '@project/shared-dto';

@Controller('training')
@UseGuards(JwtAuthGuard)
export class TrainingController {
  constructor(
    private readonly trainingService: TrainingService,
  ) {}

  @Post('/')
  @UseGuards(CoachOnlyGuard)
  @UsePipes(new ValidationPipe({transform: true}))
  async create(@User() {userId}: TokenPayloadInterface, @Body() dto: CreateTrainingDto) {
    const newTraining = await this.trainingService.createTraining({...dto, coachId: userId});
    return fillObject(TrainingRdo, newTraining);
  }

  @Patch('/:id')
  @UseGuards(CoachOnlyGuard, TrainingAuthorGuard)
  @UsePipes(new ValidationPipe({transform: true}))
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTrainingDto) {
    const updatedTraining = await this.trainingService.updateTraining(id, dto);
    return fillObject(TrainingRdo, updatedTraining);
  }

  @Get('/coach')
  @UseGuards(CoachOnlyGuard)
  @UsePipes(new ValidationPipe({transform: true, whitelist: true}))
  async list(@Query() filters: CoachTrainingFilterDto, @User() {userId}) {
    const trainings = await this.trainingService.getTrainings({...filters, coachId: userId});
    return fillObject(TrainingRdo, trainings);
  }

  @Get('/:id')
  async show(@Param('id', ParseIntPipe) trainingId: number) {
    const training = await this.trainingService.getTraining(trainingId);
    return fillObject(TrainingRdo, training);
  }

  @Get('/')
  @UsePipes(new ValidationPipe({transform: true, whitelist: true}))
  async index(@Query() filters: SharedTrainingFilterDto) {
    const trainings = await this.trainingService.getTrainings(filters);
    return fillObject(TrainingRdo, trainings);
  }
}
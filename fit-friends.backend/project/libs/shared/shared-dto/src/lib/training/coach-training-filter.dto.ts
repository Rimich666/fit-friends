import {TrainingFilterDto} from './training-filter.dto';
import {IsEnum, IsOptional} from 'class-validator';
import {CoachTrainingSortFieldsEnum, DefaultSort, TrainingTime} from '@project/shared-types';
import {Transform} from 'class-transformer';

export class CoachTrainingFilterDto extends TrainingFilterDto {
  @IsOptional()
  @IsEnum(CoachTrainingSortFieldsEnum)
  public sort: string = DefaultSort.FIELD;

  @IsOptional()
  @IsEnum(TrainingTime, {each: true})
  @Transform((params) => params.value.split(','))
  public trainingTime: string[];

  @IsOptional()
  public coachId: string;
}

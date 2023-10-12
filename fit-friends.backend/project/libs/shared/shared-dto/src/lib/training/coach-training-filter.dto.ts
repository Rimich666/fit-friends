import {TrainingFilterDto} from './training-filter.dto';
import {IsEnum, IsOptional} from 'class-validator';
import {CoachTrainingSortFieldsEnum, DefaultSort, TrainingTime} from '@project/shared-types';

export class CoachTrainingFilterDto extends TrainingFilterDto {
  @IsOptional()
  @IsEnum(CoachTrainingSortFieldsEnum)
  public sort: string = DefaultSort.FIELD;

  @IsOptional()
  @IsEnum(TrainingTime)
  public trainingTime: string;

  @IsOptional()
  public coachId: string;
}

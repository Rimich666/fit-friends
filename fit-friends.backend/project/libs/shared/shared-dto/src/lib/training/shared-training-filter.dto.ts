import {TrainingFilterDto} from './training-filter.dto';
import {IsEnum, IsOptional} from 'class-validator';
import {DefaultSort, SharedTrainingSortFieldsEnum, TrainingType} from '@project/shared-types';

export class SharedTrainingFilterDto extends TrainingFilterDto {
  @IsOptional()
  @IsEnum(SharedTrainingSortFieldsEnum)
  public sort: string = DefaultSort.FIELD;

  @IsOptional()
  @IsEnum(TrainingType)
  public trainingType: string;

  @IsOptional()
  public coachId: string;
}

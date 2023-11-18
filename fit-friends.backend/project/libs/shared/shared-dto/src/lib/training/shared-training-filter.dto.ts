import {TrainingFilterDto} from './training-filter.dto';
import {IsEnum, IsOptional} from 'class-validator';
import {DefaultSort, SharedTrainingSortFieldsEnum, TrainingType} from '@project/shared-types';
import {Transform} from 'class-transformer';

export class SharedTrainingFilterDto extends TrainingFilterDto {
  @IsOptional()
  @IsEnum(SharedTrainingSortFieldsEnum)
  public sort: string = DefaultSort.FIELD;

  @IsOptional()
  @IsEnum(TrainingType, {each: true})
  @Transform((params) => params.value.split(','))
  public trainingType: string[];

  @IsOptional()
  public coachId: string;
}

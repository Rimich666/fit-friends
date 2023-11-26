import {IsEnum, IsInt, Max, Min} from 'class-validator';
import {Gender, RESPONSE_PAGE_LIMIT, TrainingType} from '@project/shared-types';
import {Expose, Transform} from 'class-transformer';
import {validationConstraints} from '@project/shared-constants';

export class ForYouFilterDto {
  @IsEnum(TrainingType, {each: true})
  @Transform((params) => params.value.split(','))
  public trainingType: string[];

  @Expose()
  @IsInt()
  @Transform((params) =>
    params.value ? parseInt(params.value, 10) : RESPONSE_PAGE_LIMIT)
  public limit: number = RESPONSE_PAGE_LIMIT;

  @IsInt()
  @Transform((params) => parseInt(params.value, 10))
  @Min(validationConstraints.training.caloriesCount.min)
  @Max(validationConstraints.training.caloriesCount.max)
  public caloriesCount: number;

  @IsEnum(Gender)
  public gender: string;
}

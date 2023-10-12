import {Expose} from 'class-transformer';
import {IsEnum, IsInt, IsOptional, Max, Min} from 'class-validator';
import {TrainingTime} from '@project/shared-types';
import {validationConstraints} from '@project/shared-constants';
import {trainingTypeError} from '../error-mesages';

export class UpdateSportsmanDto {
  @Expose()
  @IsEnum(TrainingTime, {message: trainingTypeError})
  @IsOptional()
  public trainingTime?: TrainingTime;

  @Expose()
  @IsInt()
  @IsOptional()
  @Max(validationConstraints.user.trainingCalories.max)
  @Min(validationConstraints.user.trainingCalories.min)
  trainingCalories?: number;

  @Expose()
  @IsInt()
  @IsOptional()
  @Max(validationConstraints.user.daysCalories.max)
  @Min(validationConstraints.user.daysCalories.min)
  daysCalories?: number;
}

import {TrainingTime} from '@project/shared-types';
import {IsEnum, IsInt, Max, Min} from 'class-validator';
import {validationConstraints} from '@project/shared-constants';
import {Expose} from 'class-transformer';
import {trainingTypeError} from '../error-mesages';


export class CreateSportsmanDto {
  @Expose()
  @IsEnum(TrainingTime, {message: trainingTypeError})
  public trainingTime: TrainingTime;

  @Expose()
  @IsInt()
  @Max(validationConstraints.user.trainingCalories.max)
  @Min(validationConstraints.user.trainingCalories.min)
  public trainingCalories?: number;

  @Expose()
  @IsInt()
  @Max(validationConstraints.user.daysCalories.max)
  @Min(validationConstraints.user.daysCalories.min)
  public daysCalories?: number;
}

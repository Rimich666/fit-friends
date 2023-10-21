import {Expose} from 'class-transformer';
import {TrainingTime} from '@project/shared-types';
import {AdditionRdo} from './addition.rdo';

export class SportsmanRdo extends AdditionRdo{
  @Expose()
  public trainingTime: TrainingTime;

  @Expose()
  public trainingCalories: number;

  @Expose()
  public daysCalories: number;
}

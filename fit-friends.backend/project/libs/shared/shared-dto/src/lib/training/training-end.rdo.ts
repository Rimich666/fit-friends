import {Expose} from 'class-transformer';
import {Gender, Level, TrainingTime, TrainingType} from '@project/shared-types';

export class TrainingEndRdo {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  level: Level;

  @Expose()
  backgroundPath: string;

  @Expose()
  trainingType: TrainingType;

  @Expose()
  trainingTime: TrainingTime;

  @Expose()
  price: number;

  @Expose()
  caloriesCount: number;

  @Expose()
  description: string;

  @Expose()
  gender: Gender;

  @Expose()
  videoPath: string;

  @Expose()
  rating: number;

  @Expose()
  coachId: string;

  @Expose()
  isSpecialOffer: boolean;

  @Expose()
  createDate: Date;
}

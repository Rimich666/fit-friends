import {Gender, Level, TrainingTime, TrainingType} from '@project/shared-types';
import {Expose} from 'class-transformer';

export class TrainingRdo {
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
  videoId: string;

  @Expose()
  rating: number;

  @Expose()
  coachId: string;

  @Expose()
  isSpecialOffer: boolean;

  @Expose()
  createDate: Date;
}

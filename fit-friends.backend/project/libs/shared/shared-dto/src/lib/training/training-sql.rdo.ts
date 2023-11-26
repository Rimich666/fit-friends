import {Expose} from 'class-transformer';
import {Gender, Level} from '@project/shared-types';

export class TrainingSqlRdo {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  level: Level;

  @Expose({name: 'background'})
  backgroundPath: string;

  @Expose({name: 'type'})
  trainingType: string;

  @Expose({name: 'time'})
  trainingTime: string;

  @Expose()
  price: number;

  @Expose({name: 'calories'})
  caloriesCount: number;

  @Expose()
  description: string;

  @Expose()
  gender: Gender;

  @Expose({name: 'video'})
  videoId: string;

  @Expose()
  rating: number;

  @Expose({name: 'coach'})
  coachId: string;

  @Expose({name: 'spec'})
  isSpecialOffer: boolean;

  @Expose({name: 'create_date'})
  createDate: Date;
}

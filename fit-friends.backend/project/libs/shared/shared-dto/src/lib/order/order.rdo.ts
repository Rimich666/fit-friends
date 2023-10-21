import {Expose} from 'class-transformer';

export class OrderRdo {
  @Expose()
  name: string;

  @Expose({name: 'background'})
  backgroundPath: string;

  @Expose()
  level: string;

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
  gender: string;

  @Expose({name: 'video'})
  videoId: string;

  @Expose()
  rating: number;

  @Expose({name: 'coach'})
  coachId: string;

  @Expose()
  spec: boolean;

  @Expose({name: 'create_date'})
  createDate: Date;

  @Expose({name: 'orderid'})
  orderId: number;

  @Expose()
  count: number;

  @Expose()
  total: number;

  @Expose({name: 'training_id'})
  trainingId: number;
}

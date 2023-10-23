import {Expose} from 'class-transformer';

export class SubscriberRdo {
  @Expose()
  public email: string;

  @Expose()
  public name: string;

  @Expose()
  public coachId: string;

  @Expose({name: '_id'})
  public id: string;
}

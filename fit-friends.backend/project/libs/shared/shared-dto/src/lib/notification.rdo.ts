import {Expose} from 'class-transformer';

export class NotificationRdo {
  @Expose({name: '_id'})
  id: string;

  @Expose()
  createDate: string;

  @Expose()
  userId: string;

  @Expose()
  text: string;
}

import {Expose} from 'class-transformer';

export class JoinTrainingRdo {
  @Expose()
  requesterId: string;

  @Expose()
  invitedId: string;

  @Expose()
  createDate: Date;

  @Expose()
  changeDate: Date;

  @Expose()
  state: string;

  @Expose({name: '_id'})
  id: string;
}

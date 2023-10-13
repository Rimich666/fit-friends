import {Expose} from 'class-transformer';

export class EmailNotificationDto {
  @Expose()
  coachName: string;

  @Expose()
  coachId: string;

  @Expose()
  url: string;

  @Expose({ name : 'name' })
  trainingName: string;
}

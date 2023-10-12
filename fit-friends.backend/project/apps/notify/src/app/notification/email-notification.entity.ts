import {EmailNotificationInterface} from '@project/shared-types';

export class EmailNotificationEntity implements EmailNotificationInterface {
  public id?: string;
  public createDate: Date;
  public coachName: string;
  public email: string;
  public subscriberName: string;
  public url: string;
  public trainingName: string;
  public coachId: string;

  constructor(notification: EmailNotificationInterface) {
    this.fillEntity(notification);
  }

  public fillEntity(entity: EmailNotificationInterface) {
    this.id = entity.id;
    this.createDate = entity.createDate;
    this.coachName = entity.coachName;
    this.email = entity.email;
    this.subscriberName = entity.subscriberName;
    this.url = entity.url;
    this.trainingName = entity.trainingName;
    this.coachId = entity.coachId;
  }

  public toObject(): EmailNotificationEntity {
    return { ...this };
  }
}

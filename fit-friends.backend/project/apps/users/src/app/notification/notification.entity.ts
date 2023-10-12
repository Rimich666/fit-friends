import {NotificationInterface} from '@project/shared-types';

export class NotificationEntity implements NotificationInterface {
  public id: string;
  public createDate: Date;
  public userId: string;
  public text: string;

  constructor(notification: NotificationInterface) {
    this.fillEntity(notification);
  }

  public fillEntity(entity: NotificationInterface) {
    this.id = entity.id;
    this.userId = entity.userId;
    this.text = entity.text;
    this.createDate = entity.createDate;
  }

  public toObject(): NotificationEntity {
    return { ...this };
  }
}

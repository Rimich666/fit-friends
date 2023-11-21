import { SubscriberInterface } from '@project/shared-types';

export class EmailSubscriberEntity implements SubscriberInterface {
  public id?: string;
  public email?: string;
  public name?: string;
  public coachId: string;

  constructor(emailSubscriber: SubscriberInterface) {
    this.fillEntity(emailSubscriber);
  }

  public fillEntity(entity: SubscriberInterface) {
    this.id = entity.id;
    this.email = entity.email;
    this.name = entity.name;
    this.coachId = entity.coachId;
  }

  public toObject(): EmailSubscriberEntity {
    return { ...this };
  }
}

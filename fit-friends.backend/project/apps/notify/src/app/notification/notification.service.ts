import { Injectable } from '@nestjs/common';
import {NotificationRepository} from './notification.repository';
import {EmailNotificationEntity} from './email-notification.entity';
import {EmailSubscriberRepository} from '../email-subscriber/email-subscriber.repository';
import {EmailNotificationDto} from '@project/shared-dto';
import {EmailNotificationModel} from '@project/notify.model';

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
    private readonly subscribeRepository: EmailSubscriberRepository
  ) {}

  public async add(dto: EmailNotificationDto) {
    const subscribers = await this.subscribeRepository.getSubscribers(dto.coachId);
    const notifications: EmailNotificationEntity[] =
      subscribers.map((subscriber) => new EmailNotificationEntity({
      ...dto, subscriberName: subscriber.name, email: subscriber.email, createDate: new Date()}));
    return this.notificationRepository.add(notifications);
  }

  public async delete (notifications: EmailNotificationModel[]) {
    const promises = notifications.map((notification) => notification.deleteOne());
    await Promise.all(promises);
  }

  public async getNews () {
    return this.notificationRepository.get();
  }
}

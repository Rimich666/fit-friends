import { Injectable } from '@nestjs/common';
import {NotificationInterface} from '@project/shared-types';
import {NotificationEntity} from './notification.entity';
import {NotificationRepository} from './notification.repository';

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationRepository: NotificationRepository
  ) {}

  public async create(item: NotificationInterface) {
    return this.notificationRepository.create(new NotificationEntity(item));
  }

  public async delete(id: string) {
    return this.notificationRepository.delete(id);
  }

  public async getNotifications(userId: string) {
    return this.notificationRepository.getNotifications(userId);
  }

  public async checkNotification(userId: string, id: string) {
    const found = await this.notificationRepository.findByID(id);
    return found ? found.userId === userId : false;
  }
}

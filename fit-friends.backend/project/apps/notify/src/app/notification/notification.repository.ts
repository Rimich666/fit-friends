import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {EmailNotificationModel} from '@project/notify.model';
import {Model} from 'mongoose';
import {EmailNotificationEntity} from './email-notification.entity';

@Injectable()
export class NotificationRepository {
  constructor(
    @InjectModel(EmailNotificationModel.name) private readonly notificationModel: Model<EmailNotificationModel>) {
  }

  public async add(notifications: EmailNotificationEntity[]) {
    return this.notificationModel.insertMany(notifications);
  }

  public async get() {
    return this.notificationModel.find();
  }
}

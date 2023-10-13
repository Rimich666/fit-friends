import { Injectable } from '@nestjs/common';
import {NotificationEntity} from './notification.entity';
import {InjectModel} from '@nestjs/mongoose';
import {NotificationModel} from '@project/fit-users.model';
import {Model} from 'mongoose';
import {GetNotificationsOptions} from '@project/shared-constants';


@Injectable()
export class NotificationRepository {
  constructor(
    @InjectModel(NotificationModel.name) private readonly notificationModel: Model<NotificationModel>) {
  }

  public async create(item: NotificationEntity) {
    return this.notificationModel.create(item);
  }

  public async delete(id: string) {
    return this.notificationModel.findByIdAndDelete(id);
  }

  public async getNotifications(userId: string) {
    return this.notificationModel.find({userId}).
    sort({[GetNotificationsOptions.sort]: GetNotificationsOptions.order}).
    limit(GetNotificationsOptions.limit);
  }

  public async findByID(id: string) {
    return this.notificationModel.findById(id);
  }
}

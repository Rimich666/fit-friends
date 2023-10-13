import {Injectable} from '@nestjs/common';
import {EmailSubscriberEntity} from './email-subscriber.entity';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {SubscriberModel} from '@project/notify.model';

@Injectable()
export class EmailSubscriberRepository {
  constructor(
    @InjectModel(SubscriberModel.name) private readonly subscribeModel: Model<SubscriberModel>) {
  }

  public async find(entity: EmailSubscriberEntity) {
    return this.subscribeModel.findOne({email: entity.email, coachId: entity.coachId});
  }

  public async create(entity: EmailSubscriberEntity) {
    return this.subscribeModel.create(entity);
  }

  public async delete(id: string) {
    return this.subscribeModel.findByIdAndDelete(id);
  }

  public async getSubscribers(coachId: string) {
    return this.subscribeModel.find({coachId});
  }
}

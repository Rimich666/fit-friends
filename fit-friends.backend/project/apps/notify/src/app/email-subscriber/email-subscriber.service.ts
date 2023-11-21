import {Injectable} from '@nestjs/common';
import {EmailSubscriberEntity} from './email-subscriber.entity';
import {EmailSubscriberRepository} from './email-subscriber.repository';
import {NotSubscribeException} from '@project/util-core';


@Injectable()
export class EmailSubscriberService {
  constructor(
    private readonly emailSubscriberRepository: EmailSubscriberRepository
  ) {}

  public async create(entity: EmailSubscriberEntity) {
    const found = await this.emailSubscriberRepository.find(entity);
    return found ? found : await this.emailSubscriberRepository.create(entity);
  }

  public async delete(entity: EmailSubscriberEntity) {
    const found = await this.emailSubscriberRepository.find(entity);
    if (!found) {
      throw new NotSubscribeException(entity.email, entity.coachId);
    }
    return this.emailSubscriberRepository.delete(found.id);
  }

  public async check(entity: EmailSubscriberEntity) {
    const found = await this.emailSubscriberRepository.find(entity);
    return !!found;
  }
}

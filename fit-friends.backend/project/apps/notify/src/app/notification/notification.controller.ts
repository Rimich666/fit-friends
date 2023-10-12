import {Controller} from '@nestjs/common';
import {NotificationService} from './notification.service';
import {MailService} from '../mail/mail.service';
import {RabbitSubscribe} from '@golevelup/nestjs-rabbitmq';
import {getSubscribeOption, RabbitRoutingKeys} from '@project/modules-options';
import {EmailNotificationDto} from '@project/shared-dto';

@Controller('email-notification')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly mailService: MailService,
  ) {}

  @RabbitSubscribe(getSubscribeOption(RabbitRoutingKeys.AddNotification))
  public async create(dto: EmailNotificationDto) {
    await this.notificationService.add(dto);
  }

  @RabbitSubscribe(getSubscribeOption(RabbitRoutingKeys.SendNews))
  public async sendNews() {
    const notifications = await this.notificationService.getNews();
    await this.mailService.send(notifications);
    await this.notificationService.delete(notifications);
  }
}

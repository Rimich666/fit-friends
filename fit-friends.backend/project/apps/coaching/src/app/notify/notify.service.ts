import {Inject, Injectable} from '@nestjs/common';
import {AmqpConnection} from '@golevelup/nestjs-rabbitmq';
import {rabbitConfig} from '@project/configurations';
import {ConfigType} from '@nestjs/config';
import {RabbitRoutingKeys} from '@project/modules-options';
import {EmailNotificationDto} from '@project/shared-dto';

@Injectable()
export class NotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbitOptions: ConfigType<typeof rabbitConfig>
  ) {}

  public async sendNewTraining(rdo: EmailNotificationDto) {
    return this.rabbitClient.publish<EmailNotificationDto>(
      this.rabbitOptions.bindings[RabbitRoutingKeys.AddNotification].exchange,
      this.rabbitOptions.bindings[RabbitRoutingKeys.AddNotification].binding,
      {...rdo}
    );
  }
}

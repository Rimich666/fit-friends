import {Inject, Injectable} from '@nestjs/common';
import {AmqpConnection} from '@golevelup/nestjs-rabbitmq';
import {rabbitConfig} from '@project/configurations';
import {RabbitRoutingKeys} from '@project/modules-options';
import {ConfigType} from '@nestjs/config';

@Injectable()
export class NotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbitOptions: ConfigType<typeof rabbitConfig>
  ) {}

  public async sendNews() {
    return this.rabbitClient.publish(
      this.rabbitOptions.bindings[RabbitRoutingKeys.SendNews].exchange,
      this.rabbitOptions.bindings[RabbitRoutingKeys.SendNews].binding,'');
  }
}

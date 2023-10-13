import {Body, Controller, Delete, Param, Post, UseGuards} from '@nestjs/common';
import {EmailSubscriberService} from './email-subscriber.service';
import {JwtAuthGuard, User} from '@project/shared-enhancers';
import {TokenPayloadInterface} from '@project/shared-types';
import {SubscribeDto} from '@project/shared-dto';
import {EmailSubscriberEntity} from './email-subscriber.entity';
import {ControllerPrefix} from '@project/shared-constants';

@Controller(ControllerPrefix.emailSubscriber)
@UseGuards(JwtAuthGuard)
export class EmailSubscriberController {
  constructor(
    private readonly emailSubscriberService: EmailSubscriberService
  ) {}

  @Post('/')
  public async create(@Body() {coachId}: SubscribeDto, @User() {email, name}: TokenPayloadInterface) {
    return this.emailSubscriberService.create(new EmailSubscriberEntity({coachId, email, name}));
  }

  @Delete('/:id')
  public async delete(@Param('id') coachId: string, @User() {email}: TokenPayloadInterface) {
    return await this.emailSubscriberService.delete(new EmailSubscriberEntity({coachId, email}));
  }
}

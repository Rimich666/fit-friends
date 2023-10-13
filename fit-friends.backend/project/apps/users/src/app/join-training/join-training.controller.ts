import {Body, Controller, Patch, Post, UseGuards, ValidationPipe} from '@nestjs/common';
import {ControllerPrefix} from '@project/shared-constants';
import {JoinTrainingService} from './join-training.service';
import {CreateJoinTrainingDto, UpdateJoinTrainingDto} from '@project/shared-dto';
import {JwtAuthGuard, User} from '@project/shared-enhancers';
import {NotInvitedGuard} from './not-invited.guard';
import {ElsesRequestGuard} from './elses-request.guard';
import {changeStatusNotification, createRequestNotification} from '@project/helpers';
import {NotificationService} from '../notification/notification.service';
import {RequestState} from '@project/shared-types';

@Controller(ControllerPrefix.joinTraining)
@UseGuards(JwtAuthGuard)
export class JoinTrainingController {
  constructor(
    private readonly joinTrainingService: JoinTrainingService,
    private readonly notificationService: NotificationService
  ) {}

  @Post('/')
  @UseGuards(NotInvitedGuard)
  async create(@Body() dto: CreateJoinTrainingDto, @User() {userId, name}) {
    const created = await this.joinTrainingService.create({...dto, requesterId: userId});
    await this.notificationService.create({userId: created.invitedId, text: createRequestNotification(name)});
    return created;
  }

  @Patch('/')
  @UseGuards(ElsesRequestGuard)
  async changeStatus(@Body(ValidationPipe) {id, state}: UpdateJoinTrainingDto, @User() {name}) {
    const changed = await this.joinTrainingService.changeStatus(id, state);
    await this.notificationService.create({
      userId: changed.requesterId, text: changeStatusNotification(name, changed.state as RequestState)});
    return changed;
  }
}

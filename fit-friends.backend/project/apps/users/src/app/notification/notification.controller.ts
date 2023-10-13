import {Controller, Delete, Get, Param, UseGuards} from '@nestjs/common';
import {ControllerPrefix} from '@project/shared-constants';
import {JwtAuthGuard, User} from '@project/shared-enhancers';
import {NotificationService} from './notification.service';
import {ElsesNotificationGuard} from './elses-notification.guard';

@Controller(ControllerPrefix.notification)
@UseGuards(JwtAuthGuard)
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService
  ) {}

  @Delete('/:id')
  @UseGuards(ElsesNotificationGuard)
  async delete(@Param('id') idNotification: string) {
    return this.notificationService.delete(idNotification);
  }

  @Get('/')
  async index(@User() {userId}) {
    return this.notificationService.getNotifications(userId);
  }
}

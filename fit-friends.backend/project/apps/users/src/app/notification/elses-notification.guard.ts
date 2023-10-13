import {CanActivate, ConflictException, ExecutionContext, Injectable} from '@nestjs/common';
import {NotificationService} from './notification.service';

@Injectable()
export class ElsesNotificationGuard implements CanActivate {
  constructor(
    private notificationService: NotificationService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const id = req.params['id'];
    const userId = req.user.userId;
    const checked = await this.notificationService.checkNotification(userId, id);

    if (!checked) {
      throw new ConflictException('You cannot delete this notification');
    }
    return true;
  }
}

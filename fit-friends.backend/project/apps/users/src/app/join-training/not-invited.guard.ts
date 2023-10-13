import {CanActivate, ConflictException, ExecutionContext, Injectable} from '@nestjs/common';
import {NotExistsUserException} from '@project/util-core';
import {JoinTrainingService} from './join-training.service';

@Injectable()
export class NotInvitedGuard implements CanActivate {
  constructor(
    private joinTrainingService: JoinTrainingService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const invitedId = req.body['invitedId'];
    const userId = req.user.id;
    if (invitedId === userId) {
      throw new ConflictException('Train with yourself without an invitation');
    }
    const checked = await this.joinTrainingService.checkUser(invitedId);
    if (!checked) {
      throw new NotExistsUserException(invitedId);
    }
    return true;
  }
}

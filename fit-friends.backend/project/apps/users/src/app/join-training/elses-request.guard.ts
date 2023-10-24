import {CanActivate, ConflictException, ExecutionContext, Injectable} from '@nestjs/common';
import {JoinTrainingService} from './join-training.service';

@Injectable()
export class ElsesRequestGuard implements CanActivate {
  constructor(
    private joinTrainingService: JoinTrainingService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const id = req.body['id'];
    const userId = req.user.userId;
    const checked = await this.joinTrainingService.checkRequest(userId, id);

    if (!checked) {
      throw new ConflictException('You cannot change the status of this invitation');
    }
    return true;
  }
}

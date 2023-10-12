import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {TrainingService} from './training.service';
import {AnotherAuthorException, NotExistsTrainingException} from '@project/util-core';

@Injectable()
export class TrainingAuthorGuard implements CanActivate {
  constructor(private readonly trainingService: TrainingService) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const idTraining = parseInt(request.params.id, 10);
    const idUser = request.user.userId;
    const check = await this.trainingService.checkTraining(idTraining);
    if (!check) {
      throw new NotExistsTrainingException(idTraining);
    }
    const isAuthor = await this.trainingService.checkUser(idTraining, idUser);
    if (!isAuthor) {
      throw new AnotherAuthorException('training');
    }
    return true;
  }
}

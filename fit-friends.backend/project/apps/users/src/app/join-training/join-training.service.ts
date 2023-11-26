import {Injectable} from '@nestjs/common';
import {FitUsersRepository} from '../fit-users/fit-users.repository';
import {JoinTrainingRepository} from './join-training.repository';
import {JoinTrainingInterface, RequestState} from '@project/shared-types';
import {JoinTrainingEntity} from './join-training.entity';

@Injectable()
export class JoinTrainingService {
  constructor(
    private joinTrainingRepository: JoinTrainingRepository,
    private fitUserRepository: FitUsersRepository,
  ) {}

  public async checkUser(userId: string): Promise<boolean> {
    const user = await this.fitUserRepository.findById(userId);
    return user !== null;
  }

  public async checkRequest(userId: string, requestId: string) {
    const found = await this.joinTrainingRepository.findById(requestId);
    return found ? userId === found.invitedId : false;
  }

  public async create (request: JoinTrainingInterface) {
    return await this.joinTrainingRepository.create(new JoinTrainingEntity({
      ...request, createDate: new Date(), changeDate: new Date(), state: RequestState.consideration
    }));
  }

  public async changeStatus(id: string, state: string) {
    const found = await this.joinTrainingRepository.findById(id);
    if (found.state === state) {
      return found;
    }
    return await this.joinTrainingRepository.update(new JoinTrainingEntity({
      id, state, changeDate: new Date()
    }));
  }

  public async getConsideration(id: string) {
    return (await this.joinTrainingRepository.getConsideration(id)).map((request) =>
      ({requesterId: request.requesterId, id: request.id}));
  }
}

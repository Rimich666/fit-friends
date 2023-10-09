import {RequestState} from './enums';

export interface TrainingRequestInterface {
  initiatorId: string;
  userId: string;
  createDate: Date;
  changeStateDate: Date;
  state: RequestState
}

import {JoinTrainingInterface} from '@project/shared-types';

export class JoinTrainingEntity implements JoinTrainingInterface {
  public id: string;
  public invitedId: string;
  public requesterId: string;
  public createDate: Date;
  public changeDate: Date;
  public state: string;

  constructor(request: JoinTrainingInterface) {
    this.fillEntity(request);
  }

  public fillEntity(request: JoinTrainingInterface) {
    this.id = request.id;
    this.invitedId = request.invitedId;
    this.requesterId = request.requesterId;
    this.createDate = request.createDate;
    this.changeDate = request.changeDate;
    this.state = request.state;
  }

  public toObject() {
    return {
      ...this
    };
  }
}

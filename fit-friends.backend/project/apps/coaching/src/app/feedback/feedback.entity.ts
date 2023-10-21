import {
  FeedbackInterface,
} from '@project/shared-types';

export class FeedbackEntity implements FeedbackInterface {
  public id: number;
  public authorId: string;
  public trainingId: number;
  public rating: number;
  public text: string;
  public createDate: Date;

  constructor(feedback: FeedbackInterface) {
    this.fillEntity(feedback);
  }

  public fillEntity(feedback: FeedbackInterface) {
    this.id = feedback.id;
    this.authorId = feedback.authorId;
    this.trainingId = feedback.trainingId;
    this.rating = feedback.rating;
    this.text = feedback.text;
    this.createDate = feedback.createDate;
  }

  public toObject() {
    const {id, ...item} = this;
    return { ...item};
  }

}

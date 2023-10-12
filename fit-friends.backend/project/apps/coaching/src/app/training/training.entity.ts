import {
  TrainingInterface
} from '@project/shared-types';
import {instanceToPlain} from 'class-transformer';

export class TrainingEntity implements TrainingInterface {
  public id?: number;
  public name: string;
  public backgroundPath: string;
  public level: string;
  public trainingType: string;
  public trainingTime: string;
  public price: number;
  public caloriesCount: number;
  public description: string;
  public gender: string;
  public videoId: string;
  public rating: number;
  public coachId: string;
  public isSpecialOffer: boolean;
  public createDate: Date;

  constructor(training: TrainingInterface) {
    this.fillEntity(training);
  }

  public fillEntity(training: TrainingInterface) {
    this.id = training.id;
    this.name = training.name;
    this.backgroundPath = training.backgroundPath;
    this.level = training.level;
    this.trainingType = training.trainingType;
    this.trainingTime = training.trainingTime;
    this.price = training.price;
    this.caloriesCount = training.caloriesCount;
    this.description = training.description;
    this.gender = training.gender;
    this.videoId = training.videoId;
    this.rating = training.rating;
    this.coachId = training.coachId;
    this.isSpecialOffer = training.isSpecialOffer;
    this.createDate = training.createDate;
  }

  public toObject() {
    const {id, ...item} = this;
    return { ...item};
  }

  toUpdateEntity(): object {
    return instanceToPlain(this, {exposeUnsetFields: false});
  }
}

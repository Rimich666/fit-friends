import {CreateTrainingInterface} from '../types/create-training.interface';
import {Gender, Level, TrainingTime, TrainingType} from '../enums';
import {CreateTrainingErrorsInterface} from '../types/create-training-errors.interface';

export const getNewCreateTraining = (): CreateTrainingInterface => (
  {
    name: '',
    level: undefined as unknown as Level,
    trainingType: undefined as unknown as TrainingType,
    trainingTime: undefined as unknown as TrainingTime,
    price: 0,
    caloriesCount: 0,
    description: '',
    gender: Gender.all,
    video: undefined as unknown as File,
    coachId: '',
    isSpecialOffer: false
  }
);

export const getEmptyCreateTrainingErrors = (): CreateTrainingErrorsInterface => (
  {
    name: '',
    level: '',
    trainingType: '',
    trainingTime: '',
    price: '',
    caloriesCount: '',
    description: '',
    gender: '',
    video: '',
  }
);

export const fillCreateTrainingErrors = (errors: {[k: string]: string}): CreateTrainingErrorsInterface => (
  {
    name: errors.name ? errors.name : '',
    level: errors.level ? errors.level : '',
    trainingType: errors.trainingtype ? errors.trainingtype : '',
    trainingTime: errors.trainingtime ? errors.trainingtime : '',
    price: errors.price ? errors.price : '',
    caloriesCount: errors.caloriescount ? errors.caloriescount : '',
    description: errors.description ? errors.description : '',
    gender: errors.gender ? errors.gender : '',
    video: errors.video ? errors.video : '',
  }
);

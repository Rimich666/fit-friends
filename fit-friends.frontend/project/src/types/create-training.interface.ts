import {Gender, Level, TrainingTime, TrainingType} from '../enums';
import {Field} from './field.interface';

export interface CreateTrainingInterface extends Field{
    name: string;
    level: Level;
    trainingType: TrainingType;
    trainingTime: TrainingTime;
    price: number;
    caloriesCount: number;
    description: string;
    gender: Gender;
    video: File;
    coachId: string;
    isSpecialOffer: boolean;
}

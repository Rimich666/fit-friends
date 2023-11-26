import {Level, TrainingTime, TrainingType} from '../../enums';
import {Field} from '../field.interface';

export interface QuestionnaireInterface extends Field {
  certificate: File[];
  merits: string;
  isReady: boolean;

  trainingTime: TrainingTime;
  trainingCalories: number;
  daysCalories: number;

  level: Level;
  trainingType: TrainingType[];
}

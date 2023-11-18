import {Gender, Level, TrainingType, UserLocation} from '../enums';
import {Field} from './field.interface';

export interface UpdateUserInterface extends Field{
  name: string;
  description: string;
  trainingType: TrainingType[];
  gender: Gender;
  level: Level;
  location: UserLocation;
  isReady: boolean;
  avatarPath: string;
  avatar: File;
}

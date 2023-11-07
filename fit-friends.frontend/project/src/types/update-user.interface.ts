import {Gender, Level, TrainingType, UserLocation} from '../enums';

export interface UpdateUserInterface {
  name: string;
  description: string;
  trainingType: TrainingType[];
  gender: Gender;
  level: Level;
  location: UserLocation;
  isReady: boolean;
  avatarPath: string;
}

import {TrainingType, UserLocation} from '../enums';

export interface FriendInterface {
  id: string;
  name: string;
  avatar: string;
  location: UserLocation;
  trainingTypes: TrainingType[];
  isReady: boolean;
  isRequest: boolean;
  idRequest: string;
}

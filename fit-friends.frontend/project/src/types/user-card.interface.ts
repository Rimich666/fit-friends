import {Role, TrainingType, UserLocation} from '../enums';

export interface UserCardInterface {
  id: string;
  role: Role;
  src: string;
  name: string;
  location: UserLocation;
  specialization: TrainingType[];
}

export interface UserCardCardInterface {
  id: string;
  role: Role;
  src: string;
  name: string;
  location: string;
  isReady: boolean;
  description: string;
  specialization: string[];
  imagePath: string;
}

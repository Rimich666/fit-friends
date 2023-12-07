import {Gender, Level, Role, TrainingTime, TrainingType, UserLocation} from '../enums';
import {CertificateInterface} from './certificate.interface';

export interface UserInterface {
  id: string;
  email: string;
  name: string;
  birthDate: Date;
  gender: Gender;
  location: UserLocation;
  avatarPath: string;
  imagePath: string;
  role: Role;
  description: string;
  createDate: Date;
  level: Level;
  trainingType: TrainingType[];
  isReady: boolean;
  certificate?: CertificateInterface[];
  merits?: string;
  trainingTime?: TrainingTime;
  trainingCalories?: number;
  daysCalories?: number;
 }

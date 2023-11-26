import {Gender, Role, UserLocation} from '../../enums';
import {Field} from '../field.interface';

export interface RegisterUserInterface extends Field{
  password: string;
  email: string;
  name: string;
  birthDate: Date;
  gender: Gender;
  location: UserLocation;
  avatar: File;
  role: Role;
}

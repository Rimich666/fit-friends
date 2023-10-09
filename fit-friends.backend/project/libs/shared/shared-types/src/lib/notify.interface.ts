import {UserInterface} from './user.interface';

export interface NotifyInterface {
  createDate: Date;
  user: UserInterface;
  text: string;
}

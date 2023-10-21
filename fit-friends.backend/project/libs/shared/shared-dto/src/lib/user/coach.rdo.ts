import {Expose} from 'class-transformer';
import {AdditionRdo} from './addition.rdo';

export class CoachRdo extends AdditionRdo{
  @Expose()
  public certificatePath: string;

  @Expose()
  public merits: string;
}

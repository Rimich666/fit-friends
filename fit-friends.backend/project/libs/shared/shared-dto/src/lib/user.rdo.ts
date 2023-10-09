import {Expose} from 'class-transformer';
import {Addition, Gender, Level, Role, TrainingType, UserLocation} from '@project/shared-types';

export class UserRdo {
  @Expose()
  public id: string;

  @Expose()
  public email: string;

  @Expose()
  public name: string;

  @Expose()
  public avatarId: string;

  @Expose()
  public gender: Gender;

  @Expose()
  public createDate: Date;

  @Expose()
  public birthDate: Date;

  @Expose()
  public role: Role;

  @Expose()
  public description: string;

  @Expose()
  public location: UserLocation;

  @Expose()
  public imagePath: string;

  @Expose()
  public createData: Date;

  @Expose()
  public level: Level;

  @Expose()
  public trainingType: TrainingType[];

  @Expose()
  public isReady: boolean;

  @Expose()
  public addition: Addition;
}

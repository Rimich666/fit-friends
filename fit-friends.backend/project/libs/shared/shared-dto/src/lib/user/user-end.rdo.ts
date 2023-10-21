import {UserRdo} from './user.rdo';
import {Exclude, Expose, Type} from 'class-transformer';
import {Gender, Level, Role, TrainingType, UserLocation} from '@project/shared-types';
import {AdditionRdo} from './addition.rdo';
import {SportsmanRdo} from './sportsman.rdo';
import {CoachRdo} from './coach.rdo';

export class UserEndRdo {
  @Expose()
  public id: string;

  @Expose()
  public email: string;

  @Expose()
  public name: string;

  @Expose()
  public gender: Gender;

  @Expose()
  public createDate: Date;

  @Expose()
  public birthDate: Date;

  @Expose()
  public role: string;

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
  public avatarPath: string;

  @Expose()
  @Type(() => AdditionRdo, {
    discriminator: {
      property: '__type',
      subTypes: [
        { value: CoachRdo, name: 'coach'},
        { value: SportsmanRdo, name: Role.sportsman },
      ],
    },
  })
  public addition: CoachRdo | SportsmanRdo;
}

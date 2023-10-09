import {Addition, Gender, Level, Role, TrainingType, UserInterface, UserLocation} from '@project/shared-types';
import {compare, genSalt, hash} from 'bcrypt';
import {SALT_ROUNDS} from '@project/shared-constants';

export class UserEntity implements UserInterface {
  public id: string;
  public avatarId: string;
  public email: string;
  public name: string;
  public password: string;
  public gender: Gender;
  public birthDate: Date;
  public role: Role;
  public description: string;
  public location: UserLocation;
  public imagePath: string;
  public createDate: Date;
  public level: Level;
  public trainingType: TrainingType[];
  public isReady: boolean;
  public addition: Addition;

  constructor(user: UserInterface) {
    this.fillEntity(user);
  }

  public fillEntity(user: UserInterface) {
    this.id = user.id;
    this.avatarId = user.avatarId;
    this.email = user.email;
    this.name = user.name;
    this.password = user.password;
    this.gender = user.gender;
    this.birthDate = user.birthDate;
    this.role = user.role;
    this.description = user.description;
    this.location = user.location;
    this.imagePath = user.imagePath;
    this.createDate = user.createDate;
    this.level = user.level;
    this.trainingType = user.trainingType ? [...user.trainingType] : undefined;
    this.isReady = user.isReady;
    this.addition = user.addition ?
      Object.fromEntries(Object.entries(user.addition).filter(([, v]) => v !== undefined)) : undefined;
  }

  public toObject() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      role: this.role
    };
  }

  public async setPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.password = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.password);
  }
}

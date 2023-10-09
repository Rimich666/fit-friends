import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {
  Addition,
  Gender,
  Level,
  Role,
  TrainingType,
  UserInterface,
  UserLocation
} from '@project/shared-types';
import {Document} from 'mongoose';

@Schema({
  collection: 'fit-users',
  timestamps: true
})
export class FitUserModel extends Document implements UserInterface {
  @Prop()
  public name: string;

  @Prop()
  public email: string;

  @Prop()
  public avatarId: string;

  @Prop()
  public password: string;

  @Prop({type: String})
  public gender: Gender;

  @Prop()
  public birthDate: Date;

  @Prop({type: String})
  public role: Role;

  @Prop()
  public description: string;

  @Prop({type: String})
  public location: UserLocation;

  @Prop()
  public imagePath: string;

  @Prop({type: Date, default: new Date()})
  public createDate: Date;

  @Prop({type: String})
  public level: Level;

  @Prop({type: [String]})
  public trainingType: TrainingType[];

  @Prop()
  public isReady: boolean;

  @Prop({type: Map<string, string | number>})
  public addition: Addition;
}

export const FitUserSchema = SchemaFactory.createForClass(FitUserModel);

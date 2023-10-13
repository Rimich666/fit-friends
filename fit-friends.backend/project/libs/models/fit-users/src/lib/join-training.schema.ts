import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema({
  collection: 'join-trainings',
  timestamps: true
})
export class JoinTrainingModel extends Document {
  @Prop()
  public requesterId: string;

  @Prop()
  invitedId: string;

  @Prop()
  createDate?: Date;

  @Prop()
  changeDate?: Date;

  @Prop()
  state?: string;
}

export const JoinTrainingSchema = SchemaFactory.createForClass(JoinTrainingModel);

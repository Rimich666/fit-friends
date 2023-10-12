import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {
  UserInterface,
} from '@project/shared-types';
import {Document} from 'mongoose';

@Schema({
  collection: 'email-notification',
  timestamps: true
})
export class EmailNotificationModel extends Document implements UserInterface {
  @Prop()
  createDate: Date;

  @Prop()
  subscriberName: string;

  @Prop()
  email: string;

  @Prop()
  coachName: string;

  @Prop()
  url: string;

  @Prop()
  trainingName: string;
}

export const EmailNotificationSchema = SchemaFactory.createForClass(EmailNotificationModel);

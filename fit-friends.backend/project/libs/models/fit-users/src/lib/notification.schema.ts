import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema({
  collection: 'notification',
  timestamps: true
})
export class NotificationModel extends Document {
  @Prop()
  createDate: Date;

  @Prop()
  userId: string;

  @Prop()
  text: string;
}

export const NotificationSchema = SchemaFactory.createForClass(NotificationModel);

import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {
  SubscriberInterface,
} from '@project/shared-types';
import {Document} from 'mongoose';

@Schema({
  collection: 'subscribers',
  timestamps: true
})
export class SubscriberModel extends Document implements SubscriberInterface {
  @Prop()
  email: string;

  @Prop()
  name: string;

  @Prop()
  coachId: string;
}

export const SubscriberSchema = SchemaFactory.createForClass(SubscriberModel);

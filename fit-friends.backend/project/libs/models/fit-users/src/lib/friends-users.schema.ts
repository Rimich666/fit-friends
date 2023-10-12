import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema({
  collection: 'friends',
  timestamps: true
})
export class FriendsUsersModel extends Document {
  @Prop({})
  public sweetCouple: [string, string];
}

export const FriendUserSchema = SchemaFactory.createForClass(FriendsUsersModel);

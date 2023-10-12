import {IsMongoId} from 'class-validator';

export class FriendsDto {
  @IsMongoId()
  friendId?: string;
}

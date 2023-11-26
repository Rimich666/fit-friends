import {FriendInterface} from '../friend.interface';

export type FriendState = {
  isFriendsLoaded: boolean;
  friends: FriendInterface[];
  isFriendsLoading: boolean;
};

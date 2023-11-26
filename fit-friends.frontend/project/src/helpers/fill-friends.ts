import {FriendInterface} from '../types/friend.interface';
import {TrainingType, UserLocation} from '../enums';
import {UserRdo} from '../types/user.rdo';

export const fillFriends = (user: UserRdo): FriendInterface => ({
  id: user.id,
  name: user.name,
  avatar: user.avatarPath,
  location: user.location as UserLocation,
  trainingTypes: [...user.trainingType] as TrainingType[],
  isReady: user.isReady,
  isRequest: user.isRequest as boolean,
  idRequest: user.idRequest as string,
});

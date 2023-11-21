import {UserRdo} from '../types/user.rdo';
import {UserCardCardInterface, UserCardInterface} from '../types/user-card.interface';
import {Role, TrainingType, UserLocation} from '../enums';
import {UserInterface} from '../types/user.interface';

export const fillUserCard = (rdo: UserRdo): UserCardInterface => ({
  id: rdo.id,
  location: rdo.location as UserLocation,
  name: rdo.name,
  role: rdo.role as Role,
  specialization: [...rdo.trainingType as TrainingType[]],
  src: rdo.avatarPath
});


export const fillUserCardCard = (user: UserInterface): UserCardCardInterface => ({
  id: user.id,
  role: user.role,
  src: user.avatarPath,
  name: user.name,
  location: user.location,
  isReady: user.isReady,
  description: user.description,
  specialization: [...user.trainingType],
  imagePath: user.imagePath,
});

import {CoachRdo, SportsmanRdo, UserRdo} from '../types/user.rdo';
import {UserInterface} from '../types/user.interface';
import {Gender, Level, Role, TrainingTime, TrainingType, UserLocation} from '../enums';

export const fillUser = (rdo: UserRdo): UserInterface => {
  const user = {
    avatarPath: rdo.avatarPath,
    birthDate: rdo.birthDate,
    createDate: rdo.createDate,
    description: rdo.description,
    email: rdo.email,
    gender: rdo.gender as Gender,
    id: rdo.id,
    isReady: rdo.isReady,
    level: rdo.level as Level,
    location: rdo.location as UserLocation,
    name: rdo.name,
    role: rdo.role as Role,
    imagePath: rdo.imagePath,
    trainingType: [...rdo.trainingType as TrainingType[]],
  };
  return user.role === Role.sportsman ? Object.assign(user, {
    trainingTime: (rdo.addition as SportsmanRdo).trainingTime as TrainingTime,
    trainingCalories: (rdo.addition as SportsmanRdo).trainingCalories,
    daysCalories: (rdo.addition as SportsmanRdo).daysCalories,
  }) : Object.assign(user, {
    certificate: [...(rdo.addition as CoachRdo).certificatePath],
    merits: (rdo.addition as CoachRdo).merits,
  });
};

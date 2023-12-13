import {userCardData} from './user-card-data';
import {fakeUserRdo} from './fake-user-rdo';
import {Role, TrainingTime} from '../../enums';

const coachAddition = {
  certificatePath: [{path: 'certificate1', ext: ''}, {path: 'certificate1', ext: 'certificate2'}, {path: 'certificate1', ext: 'certificate3'}],
  merits: 'string merits',
};

const sportsmanAddition = {
  trainingTime: TrainingTime['10 - 30'],
  trainingCalories: 1200,
  daysCalories: 3800
};

export const makeFakeUsersRdo = () => userCardData.map((user) => (
  {...Object.assign(fakeUserRdo, user), addition: user.role === Role.coach ? coachAddition : sportsmanAddition}));


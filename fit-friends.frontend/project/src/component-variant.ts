import {AppRoute} from './app-route';

export enum ComponentVariant {
  register = 'register',
  update = 'update',
  createTraining = 'createTraining',
  trainingCatalog = 'trainingCatalog',
  myTraining = 'myTraining',
  myOrders = 'myOrders',
  trainingCard = 'trainingCard',
  popularTraining = 'popularTraining',
  userCatalog = 'userCatalog',
  lookForCompany = 'lookForCompany',
  userCard = 'userCard'
}

export enum TrainingCardClass {
  trainingCatalog = 'training-catalog',
  myTraining = 'my-trainings',
  myOrders = 'my-orders',
  userCatalog = 'user-catalog',
  popularTraining = 'popular-trainings',
}

export const miniCardLink = {
  trainingCatalog: AppRoute.SportsmanTraining,
  myTraining: AppRoute.CoachTrainings,
  popularTraining: AppRoute.SportsmanTraining,
};

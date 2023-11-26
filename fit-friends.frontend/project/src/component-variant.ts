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
  userCard = 'userCard',
  purchases = 'purchases'
}

export enum TrainingCardClass {
  trainingCatalog = 'training-catalog__item',
  myTraining = 'my-trainings__item',
  myOrders = 'my-orders__item',
  userCatalog = 'users-catalog__item',
  popularTraining = 'popular-trainings__item',
  userCard = 'user-card-coach__training-item',
  purchases = 'my-purchases__item'
}

export enum CatalogListClass {
  trainingCatalog = 'training-catalog__list',
  myTraining = 'my-trainings__list',
  myOrders = 'my-orders__list',
  userCatalog = 'users-catalog__list',
  popularTraining = 'popular-trainings__list',
  purchases = 'my-purchases__list'
}


export const miniCardLink = {
  trainingCatalog: AppRoute.SportsmanTraining,
  myTraining: AppRoute.CoachTrainings,
  popularTraining: AppRoute.SportsmanTraining,
  userCard: AppRoute.SportsmanTraining
};

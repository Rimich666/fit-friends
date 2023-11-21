import {AppRoute} from "../../app-route";
import {TrainingTime, TrainingType, TrainingTypeText, UserLocation} from "../../enums";
import {ComponentVariant} from "../../component-variant";

export enum FilterPlace {
  myTraining = 'my-training',
  catalog = ''
}

export enum RangeTypes {
  price = 'price',
  calories = 'calories',
  rating = 'rating',
}

export enum RangeClass {
  price = 'price',
  calories = 'calories',
  rating = 'raiting',
}

export enum ControlClass {
  price = 'range',
  calories = 'range',
  rating = 'raiting',
}

export enum RangeTitle {
  price = 'Цена, ₽',
  calories = 'Калории',
  rating = 'Рейтинг',
}

export enum RangeName {
  price = '',
  calories = '-cal',
}

export enum H1 {
  trainingCatalog = 'Каталог тренировок',
  myTraining = 'Мои тренировки',
  userCatalog = 'Каталог пользователя'
}

export enum FilterTitle {
  trainingCatalog = 'Мои тренировки Фильтр',
  myTraining = 'Мои тренировки Фильтр',
  userCatalog = 'Каталог пользователя'
}

export enum FormClass {
  trainingCatalog = 'gym-catalog-form',
  myTraining = 'my-training-form',
  userCatalog = 'user-catalog-form'
}

export enum LiClass {
  lookForCompany = 'look-for-company__item',
  userCatalog = 'users-catalog__item'
}

export enum BtnClass {
  lookForCompany = 'btn--outlined look-for-company__item',
  userCatalog = ''
}

export enum CheckName {
  trainingCatalog = 'type',
  myTraining = 'duration'
}

export const backRoute = {
  trainingCatalog: AppRoute.Main,
  myTraining: AppRoute.Coach,
  userCatalog: AppRoute.Main,
};

export enum CheckType {
  location = 'location',
  specialization = 'specialization',
  // level = 'level',
  time = 'time',
  type = 'type'
}

export enum CheckClass {
  location = 'location',
  specialization = 'spezialization',
  type = 'type',
  time = 'duration',
}

export enum CheckTitle {
  location = 'Локация, станция метро',
  specialization = 'Специализация',
  time = 'Длительность',
  type = 'Тип'
}

export const getCheckType = (variant: ComponentVariant): CheckType[] => {
  switch (variant){
    case ComponentVariant.trainingCatalog: return [CheckType.type];
    case ComponentVariant.userCatalog: return [CheckType.location, CheckType.specialization];
    case ComponentVariant.myTraining: return [CheckType.time];
  }
  return [];
};

export const getIterable = (type: string) => {
  switch (type){
    case CheckType.location: return UserLocation;
    case CheckType.specialization: return TrainingType;
    case CheckType.time: return TrainingTime;
    case CheckType.type: return TrainingType;
  }
  return {p: false};
};

export const getLabel = (type: string) => {
  switch (type){
    case CheckType.location: return UserLocation;
    case CheckType.specialization: return TrainingTypeText;
    case CheckType.time: return TrainingTime;
    case CheckType.type: return TrainingTypeText;
  }
  return {p: false};
};

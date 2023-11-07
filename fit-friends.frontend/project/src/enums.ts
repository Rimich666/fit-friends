export enum Gender {
  male = 'male',
  female = 'female',
  all = 'all'
}

export enum GenderText {
  male = 'Мужской',
  female = 'Женский',
  all = 'Неважно'
}

export enum Role {
  coach = 'coach',
  sportsman = 'sportsman'
}

export const roleClass = {
  coach: 'coach',
  sportsman: 'user'
};

export enum UserLocation {
  pioneer = 'Пионерская',
  petrogradskaya = 'Петроградская',
  regional = 'Удельная',
  starry = 'Звёздная',
  sportive = 'Спортивная'
}

export enum Level {
  beginner = 'beginner',
  amateur = 'amateur',
  professional = 'professional'
}

export enum LevelText {
  beginner = 'Новичок',
  amateur = 'Любитель',
  professional = 'Профессионал'
}

export enum TrainingType {
  yoga = 'yoga',
  running = 'running',
  power = 'power',
  aerobics = 'aerobics',
  crossfit = 'crossfit',
  box = 'box',
  pilates = 'pilates',
  stretching = 'stretching',
}

export enum TrainingTime {
  '10 - 30' = '10 - 30',
  '30 - 50' = '30 - 50',
  '50 - 80' = '50 - 80',
  '80 - 100' = '80 - 100',
}

export enum PurchaseType {
  membership = 'membership'
}

export enum PaymentOption {
  visa = 'visa',
  mir = 'mir',
  umoney = 'umoney'
}

export enum RequestState {
  accepted = 'accepted',
  rejected = 'rejected',
  consideration = 'consideration'
}

export enum Direction {
  forward = 1,
  back = -1,
}

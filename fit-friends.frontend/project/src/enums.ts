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

export enum GenderTrainingText {
  male = 'Мужчинам',
  female = 'Женщинам',
  all = 'Всем'
}

export enum GenderHash {
  male = 'для_мужчин',
  female = 'для_женщин',
  all = 'для_всех'
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

export enum UserLocationText {
  'Пионерская' = 'Пионерская',
  'Петроградская' = 'Петроградская',
  'Удельная' = 'Удельная',
  'Звёздная' = 'Звёздная',
  'Спортивная' = 'Спортивная'
}

export const UserLocationMap = {
  'Пионерская': {
    latitude: 60.004695,
    longitude: 30.297583,
  },
  'Петроградская': {
    latitude: 59.966390,
    longitude: 30.313147,
  },
  'Удельная' : {
    latitude: 60.019363,
    longitude: 30.316809,
  },
  'Звёздная' : {
    latitude: 59.834624,
    longitude: 30.344274,
  },
  'Спортивная' : {
    latitude: 59.956980,
    longitude: 30.280187,
  },
};

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

export enum TrainingTypeText {
  yoga = 'Йога',
  running = 'Бег',
  power = 'Силовые',
  aerobics = 'Аэробика',
  crossfit = 'Кроссфит',
  box = 'Бокс',
  pilates = 'Пилатес',
  stretching = 'Стрейчинг',
}

export enum TrainingTime {
  '10 - 30' = '10 - 30',
  '30 - 50' = '30 - 50',
  '50 - 80' = '50 - 80',
  '80 - 100' = '80 - 100',
}

export enum TrainingTimeHash {
  '10 - 30' = '10_30',
  '30 - 50' = '30_50',
  '50 - 80' = '50_80',
  '80 - 100' = '80_100',
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

export enum Order {
  asc = 'asc',
  desc = 'desc'
}

export enum PurchasesVariant {
  active = 'active',
  noActive = 'noActive'
}

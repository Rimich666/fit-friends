export enum AppRoute {
  Root = '/',
  Login = '/login',
  Register = '/register',
  Intro = '/intro',
  Main = '/main',
  Coach = '/coachOffice',
  CoachTrainings = '/coachOffice/coachTrainings',
  CreateTraining = '/coachOffice/createTraining',
  CoachFriends = '/coachOffice/friends',
  CoachOrders = '/coachOffice/orders',
  TrainingCatalog = '/main/catalog',
  CoachTraining = '/coachOffice/training',
  SportsmanTraining = '/main/training',
  UserCatalog = '/main/userCatalog',
  UserCard = '/main/userCard',
  CoachCard = '/main/coachCard',
}

export const RouteParam = {
  Training: ':training',
  UserId: ':userId'
} as const;

export const ApiRoute = {
  Login: '/login',
  Register: '/register',
  Training: '/training',
  User: '/users',
  Self: '/users/self',
  Verify: '/users/verify',
  CoachTrainings: '/training/coach',
  ForYou: '/training/forYou',
  Feedback: '/feedback',
  Balance: '/balance',
  Order: '/order',
  Friend: '/friends',
  Join: '/together',
  Subscribe: '/subscribe',
  Notification: '/notification',
  Purchases: '/purchases',
  Certificates: '/certificates'
} as const;


export enum EndPoints {
  register = 'register',
  login = 'login',
  refresh = 'refresh',
  coach = 'coach',
  rating = 'rating',
  forYou = 'forYou',
  popular = 'popular',
  special = 'special',
  self = 'self',
  company = 'company'
}

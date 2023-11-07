export enum AppRoute {
  Root = '/',
  Login = '/login',
  Register = '/register',
  Intro = '/intro',
  Main = '/main',
  Coach = '/coachOffice'
}

export enum Accept {
  avatar = '[.png", ".jpg", ".jpeg"]',
}

export enum LoginMode {
  Login = 'Login',
  Register = 'Register'
}

export const ApiRoute = {
  Login: '/login',
  Register: '/register',
  Training: '/training',
  User: '/users',
  Verify: '/users/verify',
} as const;

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const AUTH = AuthorizationStatus.Auth;

export const REQUEST_TIMEOUT = 5000;

export enum NameSpace {
  Register = 'REGISTER',
  User = 'USER',
  Training = 'TRAINING',
  Map = 'MAP',
}

export const SPECIALIZATION_LIMIT = 3;

export enum ComponentVariant {
  register = 'register',
  update = 'update'
}

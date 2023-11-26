

export enum Accept {
  avatar = '[.png", ".jpg", ".jpeg"]',
  certificate = '[.png", ".jpg", ".jpeg", ".pdf"]',
}

export enum LoginMode {
  Login = 'Login',
  Register = 'Register'
}

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
  Orders = 'ORDERS',
  Map = 'MAP',
  Reviews = 'REVIEWS',
  Balance = 'BALANCE',
  Popup = 'POPUP',
  Back = 'BACK',
  Friend = 'FRIEND',
  Notification = 'NOTIFICATION'
}

export const SPECIALIZATION_LIMIT = 3;

export enum Themes {
  light = 'light',
  dark = 'dark'
}

export enum RoleTheme {
  coach = Themes.dark,
  sportsman = Themes.light
}

export const DISCOUNT = 10;

export const LIMIT = 6;

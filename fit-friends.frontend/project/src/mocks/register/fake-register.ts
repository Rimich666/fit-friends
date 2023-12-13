import {Gender, Role, UserLocation} from '../../enums';
export const fakeRegister = {
  password: 'password',
  email: 'email@email.email',
  name: 'name',
  birthDate: new Date(),
  gender: Gender.female,
  location: UserLocation.starry,
  avatar: undefined as unknown as File,
  role: Role.coach,
};

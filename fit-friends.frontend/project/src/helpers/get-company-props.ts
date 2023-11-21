import {UserInterface} from '../types/user.interface';
import {UserCardProps} from '../components/user-card-mini/user-card';
import {Role} from '../enums';
import {ComponentVariant} from '../component-variant';

const fillProp = (user: UserInterface): UserCardProps => ({
  id: user.id,
  src: user.avatarPath,
  name: user.name,
  location: user.location,
  specialization: [...user.trainingType],
  dark: user.role === Role.coach,
  variant: undefined as unknown as ComponentVariant,
  role: user.role
});

export const getCompanyProps = (users: UserInterface[]): UserCardProps[] =>
  users.map((user) => fillProp(user));

import {UserInterface} from '../types/user.interface';
import {LookForCompanyItemProps} from '../components/user-card-mini/user-card';
import {Role} from '../enums';
import {ComponentVariant} from '../component-variant';

const fillProp = (user: UserInterface): LookForCompanyItemProps => ({
  id: user.id,
  src: user.avatarPath,
  name: user.name,
  location: user.location,
  specialization: [...user.trainingType],
  dark: user.role === Role.coach,
  variant: undefined as unknown as ComponentVariant
});

export const getCompanyProps = (users: UserInterface[]): LookForCompanyItemProps[] =>
  users.map((user) => fillProp(user));

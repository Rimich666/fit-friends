import {UserInterface} from '../types/user.interface';
import {LookForCompanyItemProps} from '../components/main-page/look-for-company/look-for-company.item';

const fillProp = (user: UserInterface): LookForCompanyItemProps => ({
  id: user.id,
  src: user.avatarPath,
  name: user.name,
  location: user.location,
  specialisation: [...user.trainingType],
});

export const getCompanyProps = (users: UserInterface[]): LookForCompanyItemProps[] =>
  users.map((user) => fillProp(user));

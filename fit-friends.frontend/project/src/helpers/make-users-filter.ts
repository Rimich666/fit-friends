import {LIMIT} from '../settings';
import {CoachTrainingsFilterInterface} from '../types/coach-trainings-filter.interface';
import {RoleSort} from '../components/training-catalog/filters/role-block/role.button';
import {Level, Order, UserLocation} from '../enums';
import {CatalogUsersFilterInterface} from '../types/catalog-users-filter.interface';


type Props = {
  check: {[p: string]: {[p: string]: boolean}};
  coachFilter: CoachTrainingsFilterInterface;
  usersFilter: {
    role: RoleSort;
    level: Level;
  };
}

export const prepareUsersFilter = ({coachFilter, check, usersFilter}: Props): CatalogUsersFilterInterface => {
  console.log(check);
  const trainingType = Object.keys(check.specialization).filter((key) => check.specialization[key]);
  const location = Object.keys(check.location).filter((key) => check.location[key]).map((key) =>
    UserLocation[key as keyof typeof UserLocation]);

  const filter: CatalogUsersFilterInterface = {...coachFilter};

  if (trainingType.length) {
    Object.assign(filter, {trainingType: trainingType});
  }
  if (location.length) {
    Object.assign(filter, {location: location});
  }
  if (usersFilter.level) {
    filter.level = usersFilter.level;
  }

  if (usersFilter.role) {
    filter.sort = 'role';
    filter.order = usersFilter.role === RoleSort.coach ? Order.asc : Order.desc;
  }
  console.log(filter);
  return filter;
};

export const makeUsersFilter = (filter: CatalogUsersFilterInterface) => {
  const {page, ...filters} = filter;
  return [`limit=${LIMIT}`, `page=${page}`].concat(
    Object.entries(filters).map(([key, value]) =>
      `${key}=${Array.isArray(value) ? value.map((item) =>
        item).join(',') : value}`)).join('&');
};

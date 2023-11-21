import {CatalogTrainingsFilterInterface} from '../types/catalog-trainings-filter.interface';
import {LIMIT} from '../settings';
import {CoachTrainingsFilterInterface} from '../types/coach-trainings-filter.interface';
import {TrainingSort} from '../components/training-catalog/filters/sort-block/sort-button';
import {Order} from '../enums';

type Props = {
  check: {[p: string]: {[p: string]: boolean}};
  coachFilter: CoachTrainingsFilterInterface;
  sortFilter: {sort: TrainingSort};
}

export const prepareCatalogTrainingsFilter = ({coachFilter, check, sortFilter}: Props): CatalogTrainingsFilterInterface => {
  const filter: CatalogTrainingsFilterInterface = {
    ...coachFilter,
    trainingType: Object.keys(check.type).filter((key) =>
      check.type[key])
  };
  if (sortFilter.sort) {
    if (sortFilter.sort === TrainingSort.freebie) {
      filter.priceMin = 0;
      filter.priceMax = 0;
    } else {
      filter.sort = 'price';
      filter.order = sortFilter.sort === TrainingSort.cheaper ? Order.asc : Order.desc;
    }
  }
  return filter;
};

export const makeCatalogTrainingsFilter = (filter: CatalogTrainingsFilterInterface): string => {
  const {page, ...filters} = filter;
  return [`limit=${LIMIT}`, `page=${page}`].concat(
    Object.entries(filters).map(([key, value]) =>
      `${key}=${Array.isArray(value) ? value.map((item) =>
        item).join(',') : value}`)).join('&');
};

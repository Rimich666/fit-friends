import {CatalogTrainingsFilterInterface} from '../types/catalog-trainings-filter.interface';
import {LIMIT} from '../settings';

// const LIMIT = 12;

export const makeCatalogTrainingsFilter = (filter: CatalogTrainingsFilterInterface): string => {
  const {page, ...filters} = filter;
  return [`limit=${LIMIT}`, `page=${page}`].concat(
    Object.entries(filters).map(([key, value]) =>
      `${key}=${Array.isArray(value) ? value.map((item) =>
        item).join(',') : value}`)).join('&');
};

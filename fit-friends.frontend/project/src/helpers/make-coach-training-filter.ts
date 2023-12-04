import {CoachTrainingsFilterInterface} from '../types/filters/coach-trainings-filter.interface';
import {LIMIT} from '../settings';

enum QueryKey {
  time = 'trainingTime',
  priceMin = 'priceMin',
  priceMax = 'priceMax',
  ratingMin = 'ratingMin',
  ratingMax = 'ratingMax',
  caloriesMin = 'caloriesMin',
  caloriesMax = 'caloriesMax',
  page = 'page',
}

export const makeCoachTrainingFilter = (filter: CoachTrainingsFilterInterface): string => {
  const {page, ...filters} = filter;
  return [`limit=${LIMIT}`, `page=${page}`].concat(
    Object.entries(filters).map(([key, value]) =>
      `${QueryKey[key as keyof typeof QueryKey]}=${Array.isArray(value) ? value.map((item) =>
        item).join(',') : value}`)).join('&');
};

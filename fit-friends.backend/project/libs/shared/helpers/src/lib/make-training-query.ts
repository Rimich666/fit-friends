import {Prisma} from '@prisma/client';
import {CoachTrainingFilterDto, SharedTrainingFilterDto} from '@project/shared-dto';

export type QueryFilter = CoachTrainingFilterDto | SharedTrainingFilterDto

export const makeTrainingQueryFilters = (query: QueryFilter) => {
  const where: Prisma.TrainingWhereInput = {};
  const orderBy: Prisma.TrainingOrderByWithAggregationInput = {[query.sort]: query.order};

  if (query['priceMin']) {
    where.price = where.price ?
      Object.assign(where.price, {gte: query.priceMin}) :
      {gte: query.priceMin};
  }
  if (query['priceMax']) {
    where.price = where.price ?
      Object.assign(where.price, {lte: query.priceMax}) :
      {lte: query.priceMax};
  }

  if (query['caloriesMin']) {
    where.caloriesCount = where.caloriesCount ?
      Object.assign(where.caloriesCount, {gte: query.caloriesMin}) :
      {gte: query.caloriesMin};
  }
  if (query['caloriesMax']) {
    where.caloriesCount = where.caloriesCount ?
      Object.assign(where.caloriesCount, {lte: query.caloriesMax}) :
      {lte: query.caloriesMax};
  }
  if (query['ratingMin']) {
    where.rating = where.rating ?
      Object.assign(where.rating, {gte: query.ratingMin}) :
      {gte: query.ratingMin};
  }
  if (query['ratingMax']) {
    where.rating = where.rating ?
      Object.assign(where.rating, {lte: query.ratingMax}) :
      {lte: query.ratingMax};
  }
  if (query['rating']) {
    where.rating = query['rating'];
  }
  if (query['trainingTime']) {
    where.trainingTime = {
      in: query['trainingTime']
    };
  }
  if (query['trainingType']) {
    where.trainingType = {
      in: query['trainingType']
    };
  }
  if (query['coachId']) {
    where.coachId = query['coachId'];
  }

  return {
    take: query.limit,
    skip: (query.page - 1) * query.limit,
    where: where,
    orderBy: orderBy,
  };
};

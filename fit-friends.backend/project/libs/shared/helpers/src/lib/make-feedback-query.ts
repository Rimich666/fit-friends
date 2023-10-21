import {Prisma} from '@prisma/client';
import {FeedbackFilterDto} from '@project/shared-dto';

export const makeFeedbackQueryFilters = (query: FeedbackFilterDto) => {
  const where: Prisma.FeedbackWhereInput = {trainingId: query.trainingId};
  const orderBy: Prisma.FeedbackOrderByWithAggregationInput = {[query.sort]: query.order};

  return {
    take: query.limit,
    skip: (query.page - 1) * query.limit,
    where: where,
    orderBy: orderBy,
  };
};

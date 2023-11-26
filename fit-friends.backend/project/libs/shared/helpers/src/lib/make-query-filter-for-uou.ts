import {ForYouFilterDto} from '@project/shared-dto';

export const makeQueryFilterForUou = (query: ForYouFilterDto) => {
  return `
    SELECT trainings.*, ABS(calories - ${query.caloriesCount}) as delta
    FROM trainings
    WHERE type IN (${query.trainingType.join(', ')})
      AND gender='female'
    ORDER BY delta
    LIMIT ${query.limit};`;
};

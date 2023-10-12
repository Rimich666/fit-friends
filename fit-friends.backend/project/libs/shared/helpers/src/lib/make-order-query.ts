import {OrderFilterDto} from '@project/shared-dto';
import {camelCaseToSnakeStyle} from '@project/util-core';

export const makeOrderQueryFilters = (query: OrderFilterDto) => {
  return `
    SELECT *
    FROM ((SELECT trainings.*, orders.id as orderId
           FROM orders
                  LEFT JOIN trainings ON orders."trainingId" = trainings.id
           WHERE trainings.coach = '${query.coachId}') as list
      LEFT JOIN
      (SELECT SUM("count") as count, SUM("total") as total, "coach" , "trainingId"
       FROM "orders" JOIN "trainings"
       ON "trainings".id = "orders"."trainingId"
       GROUP BY "trainingId", "coach") as totals
          ON totals."trainingId" = list.id) as group_totals
    ORDER BY ${camelCaseToSnakeStyle(query.sort).toLowerCase()} ${query.order.toUpperCase()}
    LIMIT ${query.limit}
    OFFSET ${(query.page - 1) * query.limit};`;
};

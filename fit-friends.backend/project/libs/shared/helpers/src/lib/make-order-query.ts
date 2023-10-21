import {OrderFilterDto} from '@project/shared-dto';
import {camelCaseToSnakeStyle} from '@project/util-core';

export const makeOrderQueryFilters = (query: OrderFilterDto) => {
  return `
    SELECT *
    FROM ((SELECT trainings.*, orders.id as orderId
           FROM orders
                  LEFT JOIN trainings ON orders."training_id" = trainings.id
           WHERE trainings.coach = '${query.coachId}') as list
      LEFT JOIN
      (SELECT SUM("count") as count, SUM("total") as total, "coach" , "training_id"
       FROM "orders" JOIN "trainings"
       ON "trainings".id = "orders"."training_id"
       GROUP BY "training_id", "coach") as totals
          ON totals."training_id" = list.id) as group_totals
    ORDER BY ${camelCaseToSnakeStyle(query.sort).toLowerCase()} ${query.order.toUpperCase()}
    LIMIT ${query.limit}
    OFFSET ${(query.page - 1) * query.limit};`;
};

export const makeOrderCountQueryFilters = (query: OrderFilterDto) => {
  return `
    SELECT COUNT(*)
    FROM (SELECT trainings.id, orders.id as orderId
           FROM orders
                  LEFT JOIN trainings ON orders."training_id" = trainings.id
           WHERE trainings.coach = '${query.coachId}')`;
};

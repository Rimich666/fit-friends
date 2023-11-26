const getTrainings = (userId: string, limit: number, page: number, isActive: boolean) => {
  return isActive ? `
    SELECT purchases_orders.training_id
    FROM (SELECT training_id
          FROM orders
          WHERE "user" = '${userId}'
          GROUP BY training_id) as purchases_orders
           RIGHT JOIN
         (select training_id FROM balances where "user" = '${userId}') as balance
         ON purchases_orders.training_id = balance.training_id
    LIMIT ${limit}
    OFFSET ${(page - 1) * limit}` : `
    SELECT training_id
        FROM orders
        WHERE "user" = '${userId}'
        GROUP BY training_id
    LIMIT ${limit}
    OFFSET ${(page - 1) * limit}`;
};

export const makeQueryPurchasesCount = (userId: string, isActive: boolean) => {
  return isActive ? `
    SELECT count(purchases_orders.training_id)
    FROM (SELECT training_id
          FROM orders
          WHERE "user" = '${userId}'
          GROUP BY training_id) as purchases_orders
           RIGHT JOIN
         (select training_id FROM balances where "user" = '${userId}') as balance
         ON purchases_orders.training_id = balance.training_id` : `
    SELECT count(purchases_orders.training_id)
        FROM (SELECT training_id FROM orders
        WHERE "user" = '${userId}'
        GROUP BY training_id) AS purchases_orders`;
};

export const makeQueryPurchases = (userId: string, limit: number, page: number, isActive: boolean) => {
  return `
        SELECT * FROM trainings WHERE (id IN (
        ${getTrainings(userId, limit, page, isActive)}
    ));`;
};

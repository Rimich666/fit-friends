import {Order} from '../enums';

export enum OrderSortFieldsEnum {
  count = 'count',
  total = 'total'
}

export type OrdersOption = {
  limit: number;
  page: number;
  sort: OrderSortFieldsEnum;
  order: Order;
}

export const DefaultOptions = {
  limit: 4,
  page: 1,
  sort: OrderSortFieldsEnum.count,
  order: Order.desc
};

export const makeOrdersFilters = ({sort, order, page, limit}: OrdersOption) =>
  `&sort=${sort}&order=${order}&page=${page}&limit=${limit}`;

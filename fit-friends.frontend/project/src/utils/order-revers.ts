import {Order} from '../enums';

export const orderRevers = (order: Order) => order === Order.asc ? Order.desc : Order.asc;

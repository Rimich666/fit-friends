import {MyOrderInterface} from '../card-interface';

export type OrdersState = {
  orders: MyOrderInterface[];
  isOrdersLoading: boolean;
  isOrderLoaded: boolean;
};

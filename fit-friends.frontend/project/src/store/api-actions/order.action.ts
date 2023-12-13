import {createAsyncThunk} from '@reduxjs/toolkit';
import {CreateOrderInterface} from '../../types/create-order.interface';
import {AppDispatch, RootState} from '../index';
import {AxiosInstance} from 'axios';
import {TypeAction} from '../typeAction';
import {ApiRoute} from '../../api-route';
import {GetOrdersInterface, OrderRdo} from '../../types/order-rdo';

export const createOrderAction = createAsyncThunk<number, CreateOrderInterface, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  TypeAction.createOrder,
  async (payload, {extra: axiosApi}) => {
    const {data} = await axiosApi.post<number>(
      ApiRoute.Order,
      payload);
    return data;
  }
);

export const fetchOrders = createAsyncThunk<GetOrdersInterface, string, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  TypeAction.fetchOrders,
  async (options, {extra: axiosApi}) => {
    const {data, headers} = await axiosApi.get<OrderRdo[]>(`${ApiRoute.Order}?${options}`);
    return {data, pages: parseInt(headers['list-size'], 10)};
  }
);

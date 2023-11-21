import {createAsyncThunk} from '@reduxjs/toolkit';
import {CreateBalance} from '../../types/create-order.interface';
import {AppDispatch, RootState} from '../index';
import {AxiosInstance} from 'axios';
import {TypeAction} from '../typeAction';
import {ApiRoute} from '../../api-route';

export const addBalance = createAsyncThunk<number, CreateBalance, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  TypeAction.addBalance,
  async (payload: CreateBalance, {extra: axiosApi}) => {
    const {data} = await axiosApi.post<number>(
      ApiRoute.Balance,
      payload);
    return data;
  }
);
export const subBalance = createAsyncThunk<number, CreateBalance, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  TypeAction.subBalance,
  async (payload: CreateBalance, {extra: axiosApi}) => {
    const {data} = await axiosApi.patch<number>(
      ApiRoute.Balance,
      payload);
    return data;
  }
);
export const fetchBalance = createAsyncThunk<number, number, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  TypeAction.fetchBalance,
  async (id: number, {extra: axiosApi}) => {
    const {data} = await axiosApi.get<number>(
      `${ApiRoute.Balance}/${id}`
    );
    return data;
  }
);

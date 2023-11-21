import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, RootState} from '../index';
import {AxiosInstance} from 'axios';
import {TypeAction} from '../typeAction';
import {ApiRoute} from '../../api-route';

export const createSubscribe = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  TypeAction.createSubscribe,
  async (coachId, {extra: axiosApi}) => {
    await axiosApi.post(ApiRoute.Subscribe,{coachId});
  }
);

export const deleteSubscribe = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  TypeAction.deleteSubscribe,
  async (coachId, {extra: axiosApi}) => {
    await axiosApi.delete(`${ApiRoute.Subscribe}/${coachId}`);
  }
);

export const checkSubscribe = createAsyncThunk<boolean, string, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  TypeAction.checkSubscribe,
  async (coachId, {extra: axiosApi}) => {
    const {data} = await axiosApi.get<boolean>(`${ApiRoute.Subscribe}/${coachId}`);
    return data;
  }
);

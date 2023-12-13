import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, RootState} from '../index';
import {AxiosInstance} from 'axios';
import {TypeAction} from '../typeAction';
import {ApiRoute} from '../../api-route';
import {RequestInterface} from '../../types/request.interface';

export const createQuestion = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  TypeAction.createQuestion,
  async (invitedId, {extra: axiosApi}) => {
    await axiosApi.post(ApiRoute.Join,{invitedId});
  }
);

export const changeStateQuestion = createAsyncThunk<RequestInterface, RequestInterface, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  TypeAction.changeStateQuestion,
  async (payload, {extra: axiosApi}) => {
    const {data} = await axiosApi.patch<RequestInterface>(ApiRoute.Join, payload);
    return data;
  }
);

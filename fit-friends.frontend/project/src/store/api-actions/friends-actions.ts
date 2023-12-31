import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, RootState} from '../index';
import {AxiosInstance} from 'axios';
import {TypeAction} from '../typeAction';
import {ApiRoute} from '../../api-route';
import {UserRdo} from '../../types/user.rdo';

export const createFriend = createAsyncThunk<boolean, string, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  TypeAction.createFriend,
  async (friendId, {extra: axiosApi}) => {
    const {data} = await axiosApi.post<boolean>(
      ApiRoute.Friend,
      {friendId});
    return data;
  }
);

export const deleteFriend = createAsyncThunk<boolean, string, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  TypeAction.deleteFriend,
  async (friendId, {extra: axiosApi}) => {
    const {data} = await axiosApi.delete<boolean>(`${ApiRoute.Friend}/${friendId}`);
    return data;
  }
);

export const fetchFriends = createAsyncThunk<UserRdo[], void, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  TypeAction.deleteFriend,
  async (_, {extra: axiosApi}) => {
    const {data} = await axiosApi.get<UserRdo[]>(ApiRoute.Friend);
    return data;
  }
);

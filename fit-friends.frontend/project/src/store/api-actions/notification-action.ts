import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, RootState} from '../index';
import {AxiosInstance} from 'axios';
import {TypeAction} from '../typeAction';
import {ApiRoute} from '../../api-route';
import {NotificationInterface} from '../../types/notification.interface';

export const fetchNotifications = createAsyncThunk<NotificationInterface[], void, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  TypeAction.fetchNotification,
  async (_, {extra: axiosApi}) => {
    const {data} = await axiosApi.get<NotificationInterface[]>(
      ApiRoute.Notification
    );
    return data;
  }
);

export const deleteNotification = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  TypeAction.deleteNotification,
  async (id, {extra: axiosApi}) => {
    await axiosApi.delete<NotificationInterface>(
      `${ApiRoute.Notification}/${id}`
    );
  }
);

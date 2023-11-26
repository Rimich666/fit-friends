import {createAsyncThunk} from '@reduxjs/toolkit';
import {UserRdo} from '../../types/user.rdo';
import {UpdateUserPayload} from '../../types/update-user.dto';
import {AppDispatch, RootState} from '../index';
import {AxiosInstance} from 'axios';
import {TypeAction} from '../typeAction';
import {ApiRoute, EndPoints} from '../../api-route';

export const fetchSelf = createAsyncThunk<UserRdo, void, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  TypeAction.fetchSelf,
  async (_, {extra: axiosApi}) => {
    const {data} = await axiosApi.get<UserRdo>(
      `${ApiRoute.Self}`
    );
    return data;
  }
);

export const fetchUser = createAsyncThunk<UserRdo, string, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  TypeAction.fetchUser,
  async (id: string, {extra: axiosApi}) => {
    const {data} = await axiosApi.get<UserRdo>(
      `${ApiRoute.User}/${id}`
    );
    return data;
  }
);

export const updateUserAction = createAsyncThunk<UserRdo, UpdateUserPayload, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  TypeAction.updateUser,
  async ({id, payload}, {extra: axiosApi}) => {
    const {data} = await axiosApi.patch<UserRdo>(
      `${ApiRoute.User}/${id}`,
      payload,
      {headers: {'Content-Type': 'multipart/form-data'}});
    return data;
  }
);

export const fetchCompany = createAsyncThunk<UserRdo[], number, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  TypeAction.fetchCompany,
  async (limit: number, {extra: axiosApi}) => {
    const {data} = await axiosApi.get<UserRdo[]>(
      `${ApiRoute.User}/${EndPoints.company}/${limit}`
    );
    return data;
  }
);

export const fetchUsers = createAsyncThunk<UserRdo[], string, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  TypeAction.fetchUsers,
  async (options: string, {extra: axiosApi}) => {
    const {data} = await axiosApi.get<UserRdo[]>(
      `${ApiRoute.User}?${options}`
    );
    return data;
  }
);

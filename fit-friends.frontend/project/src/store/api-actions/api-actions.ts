import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiRoute, AppRoute} from '../../settings';
import {AppDispatch, RootState} from '../index';
import {TypeAction} from '../typeAction';
import {AxiosInstance,} from 'axios';
import {RegisterDto} from '../../types/register.dto';
import {makeRegisterPayload} from '../../helpers/make-register-payload';
import {redirectToRoute} from '../actions';
import {LoginType, TokenType} from '../../types/login.types';
import {saveToken} from '../../servises/token';
import {saveRefresh} from '../../servises/refresh-token';
import {TrainingInterface} from '../../types/training.interface';
import {UserInterface} from '../../types/user.interface';
import {UserRdo} from '../../types/user.rdo';

export const registerAction = createAsyncThunk<RegisterDto, void, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  TypeAction.register,
  async (_, {dispatch, getState, extra: axiosApi}) => {
    const payload = makeRegisterPayload(getState().REGISTER.registerUser, getState().REGISTER.questionnaire);
    const {data} = await axiosApi.post<RegisterDto>(
      ApiRoute.Register,
      payload,
      {headers: { 'Content-Type': 'multipart/form-data'}});
    dispatch(redirectToRoute(AppRoute.Login));
    return data;
  }
);

export const loginAction = createAsyncThunk<TokenType, LoginType, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  TypeAction.login,
  async ({email, password}, {dispatch, extra: axiosApi}) => {
    const {data} = await axiosApi.post<TokenType>(ApiRoute.Login, {email, password});
    saveToken(data.accessToken);
    saveRefresh(data.refreshToken);
    dispatch(redirectToRoute(AppRoute.Main));
    return data;
  }
);

export const fetchTrainingsForYou = createAsyncThunk<TrainingInterface[], string, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  TypeAction.fetchTrainingsForYou,
  async (options,{extra: axiosApi}) => {
    const {data} = await axiosApi.get<TrainingInterface[]>(
      `${ApiRoute.Training}?${options}`,
    );
    return data;
  }
);

export const fetchTrainingsPopular = createAsyncThunk<TrainingInterface[], string, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  TypeAction.fetchTrainingsPopular,
  async (options,{extra: axiosApi}) => {
    const {data} = await axiosApi.get<TrainingInterface[]>(
      `${ApiRoute.Training}?${options}`,
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

export const fetchCompany = createAsyncThunk<UserRdo[], string, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  TypeAction.fetchCompany,
  async (options: string, {extra: axiosApi}) => {
    const {data} = await axiosApi.get<UserRdo[]>(
      `${ApiRoute.User}?${options}}`
    );
    return data;
  }
);

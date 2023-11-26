import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, RootState} from '../index';
import {TypeAction} from '../typeAction';
import {AxiosInstance,} from 'axios';
import {RegisterDto} from '../../types/auth/register.dto';
import {makeRegisterPayload} from '../../helpers/make-register-payload';
import {redirectToRoute} from '../actions';
import {LoginType, TokenType} from '../../types/auth/login.types';
import {saveToken} from '../../servises/token';
import {saveRefresh} from '../../servises/refresh-token';
import {GetTrainingsInterface, TrainingInterface} from '../../types/training.interface';
import {UserRdo} from '../../types/user.rdo';

import {AppRoute} from '../../app-route';
import {ApiRoute, EndPoints} from '../../api-route';
import {UpdateTrainingCard} from '../../helpers/make-update-training-payload';
import {PurchasesVariant} from '../../enums';

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

export const loginAction = createAsyncThunk<UserRdo, LoginType, {
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
    return data.user;
  }
);

export const fetchCoachTrainings = createAsyncThunk<GetTrainingsInterface, string, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  TypeAction.fetchCoachTrainings,
  async (options, {extra: axiosApi}) => {
    const {data, headers} = await axiosApi.get<TrainingInterface[]>(
      `${ApiRoute.CoachTrainings}?${options}`,
    );
    return {data, maxPrice: parseInt(headers['max-price'], 10), pages: parseInt(headers['list-size'], 10) };
  }
);

export const fetchTrainingCard = createAsyncThunk<TrainingInterface, number, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  TypeAction.fetchTraining,
  async (id: number, {extra: axiosApi}) => {
    const {data} = await axiosApi.get<TrainingInterface>(`${ApiRoute.Training}/${id}`);
    return data;
  }
);

export const updateTrainingCard = createAsyncThunk<TrainingInterface, UpdateTrainingCard, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(TypeAction.createTraining,
  async (card: UpdateTrainingCard, {extra: axiosApi}) => {
    const {data} = await axiosApi.patch<TrainingInterface>(
      `${ApiRoute.Training}/${card.id}`,
      card.payload,
      {headers: { 'Content-Type': 'multipart/form-data'}});
    return data;
  }

);

export const fetchTrainingsForYou = createAsyncThunk<TrainingInterface[], number, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  TypeAction.fetchTrainingsForYou,
  async (limit,{extra: axiosApi}) => {
    const {data} = await axiosApi.get<TrainingInterface[]>(
      `${ApiRoute.ForYou}/${limit}`,
    );
    return data;
  }
);

export const fetchTrainingsPopular = createAsyncThunk<TrainingInterface[], number, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  TypeAction.fetchTrainingsPopular,
  async (limit,{extra: axiosApi}) => {
    const {data} = await axiosApi.get<TrainingInterface[]>(
      `${ApiRoute.Training}/${EndPoints.popular}/${limit}`,
    );
    return data;
  }
);

export const fetchSpecialOffers = createAsyncThunk<TrainingInterface[], number, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  TypeAction.fetchSpecialOffers,
  async (limit,{extra: axiosApi}) => {
    const {data} = await axiosApi.get<TrainingInterface[]>(
      `${ApiRoute.Training}/${EndPoints.special}/${limit}`,
    );
    return data;
  }
);

export const fetchTrainingsCoachCard = createAsyncThunk<TrainingInterface[], string, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  TypeAction.fetchTrainingsCoachCard,
  async (options,{extra: axiosApi}) => {
    const {data} = await axiosApi.get<TrainingInterface[]>(
      `${ApiRoute.Training}?${options}`,
    );
    return data;
  }
);

export const fetchCatalogTrainings = createAsyncThunk<GetTrainingsInterface, string, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  TypeAction.fetchCatalogTrainings,
  async (options,{extra: axiosApi}) => {
    const {data, headers} = await axiosApi.get<TrainingInterface[]>(
      `${ApiRoute.Training}?${options}`,
    );
    return {data, maxPrice: parseInt(headers['max-price'], 10), pages: parseInt(headers['list-size'], 10) };
  }
);

export const createTrainingAction = createAsyncThunk<TrainingInterface, FormData, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  TypeAction.createTraining,
  async (payload, {dispatch, extra: axiosApi}) => {
    const {data} = await axiosApi.post<TrainingInterface>(
      ApiRoute.Training,
      payload,
      {headers: { 'Content-Type': 'multipart/form-data'}});
    dispatch(redirectToRoute(AppRoute.CoachTrainings));
    return data;
  }
);

export const fetchPurchases = createAsyncThunk<GetTrainingsInterface,
  {
    variant: PurchasesVariant;
    param: string;
  }, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  TypeAction.fetchPurchases,
  async (options,{extra: axiosApi}) => {
    const {data, headers} = await axiosApi.get<TrainingInterface[]>(
      `${ApiRoute.Purchases}/${options.variant}?${options.param}`,
    );
    return {data, pages: parseInt(headers['list-size'], 10) };
  }
);

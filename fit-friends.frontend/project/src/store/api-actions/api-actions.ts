import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, RootState} from '../index';
import {TypeAction} from '../typeAction';
import {AxiosInstance,} from 'axios';
import {RegisterDto} from '../../types/register.dto';
import {makeRegisterPayload} from '../../helpers/make-register-payload';
import {redirectToRoute} from '../actions';
import {LoginType, TokenType} from '../../types/login.types';
import {saveToken} from '../../servises/token';
import {saveRefresh} from '../../servises/refresh-token';
import {GetTrainingsInterface, TrainingInterface} from '../../types/training.interface';
import {UserRdo} from '../../types/user.rdo';
import {UpdateUserPayload} from '../../types/update-user.dto';

import {AppRoute} from '../../app-route';
import {ApiRoute} from '../../api-route';
import {FeedbackInterface} from '../../types/feedback.interface';
import {UpdateTrainingCard} from '../../helpers/make-update-training-payload';
import {CreateBalance, CreateOrderInterface} from "../../types/create-order.interface";
import {OrderInterface} from "../../types/order.interface";

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
    return {data, maxPrice: parseInt(headers['max-price'], 10)};
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


export const fetchFeedbacks = createAsyncThunk<FeedbackInterface[], number, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  TypeAction.fetchFeedbacks,
  async (id: number, {extra: axiosApi})=> {
    const {data} = await axiosApi.get<FeedbackInterface[]>(`${ApiRoute.Feedback}/${id}`);
    console.log(data);
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
    return {data, maxPrice: parseInt(headers['max-price'], 10)};
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

export const fetchSelf = createAsyncThunk<UserRdo, void, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  TypeAction.fetchUser,
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
      {headers: { 'Content-Type': 'multipart/form-data'}});
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

export const createOrderAction = createAsyncThunk<OrderInterface, CreateOrderInterface, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  TypeAction.createOrder,
  async (payload, {dispatch, extra: axiosApi}) => {
    const {data} = await axiosApi.post<OrderInterface>(
      ApiRoute.Order,
      payload);
    return data;
  }
);

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

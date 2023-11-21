import {createAsyncThunk} from '@reduxjs/toolkit';
import {FeedbackInterface} from '../../types/feedback.interface';
import {AppDispatch, RootState} from '../index';
import {AxiosInstance} from 'axios';
import {TypeAction} from '../typeAction';
import {ApiRoute} from '../../api-route';
import {CreateFeedbackInterface} from '../../types/create-feedback.interface';

export const fetchFeedbacks = createAsyncThunk<FeedbackInterface[], number, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  TypeAction.fetchFeedbacks,
  async (id: number, {extra: axiosApi}) => {
    const {data} = await axiosApi.get<FeedbackInterface[]>(`${ApiRoute.Feedback}/${id}`);
    return data;
  }
);
export const createFeedback = createAsyncThunk<
  { feedbacks: FeedbackInterface[]; rating: number }, CreateFeedbackInterface, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  TypeAction.createFeedbacks,
  async (payload: CreateFeedbackInterface, {extra: axiosApi}) => {
    const {data, headers} = await axiosApi.post<FeedbackInterface[]>(ApiRoute.Feedback, payload);
    return {feedbacks: data, rating: parseInt(headers['rating'], 10)};
  }
);

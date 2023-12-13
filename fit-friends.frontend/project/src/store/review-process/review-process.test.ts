import {createAPI} from '../../servises/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {RootState} from '../index';
import {Action, ThunkDispatch} from '@reduxjs/toolkit';
import {ApiRoute} from '../../api-route';
import {ReviewState} from '../../types/states/review-state';
import {reviewsProcess} from './review.process';
import {createFeedback, fetchFeedbacks} from '../api-actions/feedback-actions';
import {makeFakeFeedbacks} from '../../mocks/feedback/make-fake-feedbacks';
import {reviewsData} from '../../mocks/feedback/reviews-data';

describe('Reducer: user', () => {
  let state: ReviewState;

  beforeEach(() => {
    state = {reviews: []};
  });

  describe('review process test', () => {
    const api = createAPI();
    const mockAPI = new MockAdapter(api);
    const middlewares = [thunk.withExtraArgument(api)];
    const mockStore = configureMockStore<
      RootState,
      Action<string>,
      ThunkDispatch<RootState, typeof api, Action>
    >(middlewares);

    it('should update feedbacks by load', () => {
      expect(reviewsProcess.reducer(state, {type: fetchFeedbacks.fulfilled.type, payload: makeFakeFeedbacks()}))
        .toEqual({reviews: reviewsData});
    });

    it('should update feedbacks by create feedbacks', () => {
      expect(reviewsProcess.reducer(state, {type: createFeedback.fulfilled.type, payload: {feedbacks: makeFakeFeedbacks()}}))
        .toEqual({reviews: reviewsData});
    });

    it('should dispatch Load_Feedbacks when GET /feedback/:id', async () => {
      mockAPI
        .onGet(`${ApiRoute.Feedback}/25`)
        .reply(200, makeFakeFeedbacks());

      const store = mockStore();

      await store.dispatch(fetchFeedbacks(25));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchFeedbacks.pending.type,
        fetchFeedbacks.fulfilled.type
      ]);
    });

    it('should dispatch Load_Feedbacks when POST /feedback', async () => {
      mockAPI
        .onPost(ApiRoute.Feedback)
        .reply(201, makeFakeFeedbacks(), 4.5);

      const store = mockStore();

      await store.dispatch(createFeedback({
        trainingId: 25,
        rating: 3,
        text: 'string'}));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        createFeedback.pending.type,
        createFeedback.fulfilled.type
      ]);
    });
  });
});

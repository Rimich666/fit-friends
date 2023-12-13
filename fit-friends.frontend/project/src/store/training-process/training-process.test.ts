import {createAPI} from '../../servises/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {RootState} from '../index';
import {Action, ThunkDispatch} from '@reduxjs/toolkit';
import {ApiRoute, EndPoints} from '../../api-route';
import {LIMIT} from '../../settings';
import {trainingProcess} from './training.process';
import {TrainingState} from '../../types/states/training-state';
import {makeInitialTrainingState} from '../../mocks/states/make-initial-training-state';
import {fillSpecialOffers} from '../../helpers/fill-special-offers';
import {makeFakeGetTrainings, makeFakeTrainings} from '../../mocks/trainings/make-fake-trainings';
import {
  createTrainingAction,
  fetchCatalogTrainings,
  fetchCoachTrainings, fetchPurchases,
  fetchSpecialOffers, fetchTrainingCard, fetchTrainingsCoachCard,
  fetchTrainingsForYou,
  fetchTrainingsPopular
} from '../api-actions/api-actions';
import {fakeTraining} from '../../mocks/trainings/fake-training';
import {fillTrainingCard} from '../../helpers/fill-training-card';
import {createFeedback} from '../api-actions/feedback-actions';
import {fillCoachCardTraining} from '../../helpers/fill-coach-card-training';
import {parseErrors, trainingErrorKeys} from '../../helpers/parse-errors';
import {fillCreateTrainingErrors} from '../../helpers/get-new-create-training';

describe('Reducer: training', () => {
  let state: TrainingState;

  beforeEach(() => {
    state = makeInitialTrainingState();
  });

  describe('training process test', () => {
    const api = createAPI();
    const mockAPI = new MockAdapter(api);
    const middlewares = [thunk.withExtraArgument(api)];
    const mockStore = configureMockStore<
      RootState,
      Action<string>,
      ThunkDispatch<RootState, typeof api, Action>
    >(middlewares);

    it('should update special offers by load', () => {
      const payload = makeFakeTrainings();
      const newState = {...state, specialOffers: payload.map((training, index) =>
        ({...fillSpecialOffers(training), id: index}), ), isSpecialOffersLoading: false, isSpecialOffersLoaded: true};
      expect(trainingProcess.reducer(state, {type: fetchSpecialOffers.fulfilled.type, payload}))
        .toEqual(newState);
    });
    it('should set isSpecialOffersLoading to false', () => {
      expect(trainingProcess.reducer(state, {type: fetchSpecialOffers.rejected.type}))
        .toEqual({...state, isSpecialOffersLoading: false});
    });

    it('should update trainings for you by load', () => {
      const payload = makeFakeTrainings();
      expect(trainingProcess.reducer(state, {type: fetchTrainingsForYou.fulfilled.type, payload}))
        .toEqual({...state, isForYouLoading: false, isForYouLoaded: true, forYouTrainings: [...payload]});
    });
    it('should set isForYouLoading to false', () => {
      expect(trainingProcess.reducer(state, {type: fetchTrainingsForYou.rejected.type}))
        .toEqual({...state, isForYouLoading: false});
    });

    it('should update trainings popular by load', () => {
      const payload = makeFakeTrainings();
      expect(trainingProcess.reducer(state, {type: fetchTrainingsPopular.fulfilled.type, payload}))
        .toEqual({...state, isPopularLoading: false, isPopularLoaded: true, popularTrainings: [...payload] });
    });
    it('should set isPopularLoading to false', () => {
      expect(trainingProcess.reducer(state, {type: fetchTrainingsPopular.rejected.type}))
        .toEqual({...state, isPopularLoading: false});
    });

    it('should update coach trainings by load', () => {
      const payload = makeFakeGetTrainings;
      expect(trainingProcess.reducer(state, {type: fetchCoachTrainings.fulfilled.type, payload}))
        .toEqual({...state, isCoachTrainingsLoading: false, isCoachTrainingsLoaded: true,
          coachTrainings: [...payload.data], range: {...state.range, price: {...state.range.price, max: payload.maxPrice}}});
    });
    it('should set isCoachTrainingsLoading to false', () => {
      expect(trainingProcess.reducer(state, {type: fetchCoachTrainings.rejected.type}))
        .toEqual({...state, isCoachTrainingsLoading: false});
    });

    it('should update catalog trainings by load', () => {
      const payload = makeFakeGetTrainings;
      expect(trainingProcess.reducer(state, {type: fetchCatalogTrainings.fulfilled.type, payload}))
        .toEqual({...state, isCoachTrainingsLoading: false, isCatalogTrainingsLoaded: true,
          catalogTrainings: [...payload.data], range: {...state.range, price: {...state.range.price, max: payload.maxPrice}}});
    });
    it('should set isCatalogTrainingsLoading to false', () => {
      expect(trainingProcess.reducer(state, {type: fetchCatalogTrainings.rejected.type}))
        .toEqual({...state, isCatalogTrainingsLoading: false});
    });

    it('should update training card by load', () => {
      const payload = fakeTraining;
      expect(trainingProcess.reducer(state, {type: fetchTrainingCard.fulfilled.type, payload}))
        .toEqual({...state, isTrainingCardLoading: false, isTrainingCardLoaded: true,
          trainingCard: fillTrainingCard(payload)});
    });
    it('should set isTrainingCardLoading to false', () => {
      expect(trainingProcess.reducer(state, {type: fetchTrainingCard.rejected.type}))
        .toEqual({...state, isTrainingCardLoading: false});
    });

    it('should update rating by create feedbacks', () => {
      expect(trainingProcess.reducer(state, {type: createFeedback.fulfilled.type, payload: {rating: 4}}))
        .toEqual({...state, trainingCard: {...state.trainingCard, rating: 4}});
    });

    it('should update coach card trainings by load', () => {
      const payload = makeFakeTrainings();
      expect(trainingProcess.reducer(state, {type: fetchTrainingsCoachCard.fulfilled.type, payload}))
        .toEqual({...state, isCoachCardLoading: false, isCoachCardLoaded: true,
          coachCardTrainings: payload.map((training) => fillCoachCardTraining(training))});
    });
    it('should set isCoachCardLoading to false', () => {
      expect(trainingProcess.reducer(state, {type: fetchTrainingsCoachCard.rejected.type}))
        .toEqual({...state, isCoachCardLoading: false});
    });

    it('should update purchases by load', () => {
      const payload = makeFakeGetTrainings;
      expect(trainingProcess.reducer(state, {type: fetchPurchases.fulfilled.type, payload}))
        .toEqual({...state, isPurchasesLoading: false, isPurchasesLoaded: true,
          purchases: payload.data});
    });
    it('should set isPurchasesLoading to false', () => {
      expect(trainingProcess.reducer(state, {type: fetchPurchases.rejected.type}))
        .toEqual({...state, isPurchasesLoading: false});
    });

    it('createTrainingAction test', () => {
      expect(trainingProcess.reducer(state, {type: createTrainingAction.fulfilled.type}))
        .toEqual({...state});
    });
    it('createTrainingAction error test', () => {
      const message = '["trainingType must be an email", "description must be longer than or equal"]';
      const errors = parseErrors(message, trainingErrorKeys);
      const createTrainingErrors = fillCreateTrainingErrors(errors);
      const newState = {
        ...state,
        createTrainingErrors,
        isCreateTrainingError: true,
      };
      expect(trainingProcess.reducer(state, {type: createTrainingAction.rejected.type, error: {message: message, code: 'Bad Request'}}))
        .toEqual(newState);
    });


    it('should dispatch Load_Special Offers when GET /training/special', async () => {
      mockAPI
        .onGet(`${ApiRoute.Training}/${EndPoints.special}/${LIMIT}`)
        .reply(200, makeFakeTrainings());

      const store = mockStore();

      await store.dispatch(fetchSpecialOffers(LIMIT));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchSpecialOffers.pending.type,
        fetchSpecialOffers.fulfilled.type
      ]);
    });
    it('should dispatch Load Trainings For you when GET /training/forYou', async () => {
      mockAPI
        .onGet(`${ApiRoute.ForYou}/${LIMIT}`)
        .reply(200, makeFakeTrainings());

      const store = mockStore();

      await store.dispatch(fetchTrainingsForYou(LIMIT));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchTrainingsForYou.pending.type,
        fetchTrainingsForYou.fulfilled.type
      ]);
    });
    it('should dispatch Load Trainings Popular when GET /training/popular', async () => {
      mockAPI
        .onGet(`${ApiRoute.Training}/${EndPoints.popular}/${LIMIT}`)
        .reply(200, makeFakeTrainings());

      const store = mockStore();

      await store.dispatch(fetchTrainingsPopular(LIMIT));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchTrainingsPopular.pending.type,
        fetchTrainingsPopular.fulfilled.type
      ]);
    });
    it('should dispatch Load Coach Trainings when GET /training/coach', async () => {
      mockAPI
        .onGet(`${ApiRoute.Training}/${EndPoints.coach}?limit${LIMIT}`)
        .reply(200, makeFakeTrainings(), 3000);

      const store = mockStore();

      await store.dispatch(fetchCoachTrainings(`limit${LIMIT}`));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchCoachTrainings.pending.type,
        fetchCoachTrainings.fulfilled.type
      ]);
    });
    it('should dispatch Load Catalog Trainings when GET /training', async () => {
      mockAPI
        .onGet(`${ApiRoute.Training}?limit${LIMIT}`)
        .reply(200, makeFakeTrainings(), 3000);

      const store = mockStore();

      await store.dispatch(fetchCatalogTrainings(`limit${LIMIT}`));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchCatalogTrainings.pending.type,
        fetchCatalogTrainings.fulfilled.type
      ]);
    });
    it('should dispatch Load Training when GET /training', async () => {
      mockAPI
        .onGet(`${ApiRoute.Training}/25`)
        .reply(200, fakeTraining);

      const store = mockStore();

      await store.dispatch(fetchTrainingCard(25));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchTrainingCard.pending.type,
        fetchTrainingCard.fulfilled.type
      ]);
    });
  });
});

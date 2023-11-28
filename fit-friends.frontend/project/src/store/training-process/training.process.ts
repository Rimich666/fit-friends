import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace} from '../../settings';
import {
  createTrainingAction,
  fetchCatalogTrainings,
  fetchCoachTrainings, fetchPurchases, fetchSpecialOffers,
  fetchTrainingCard, fetchTrainingsCoachCard,
  fetchTrainingsForYou,
  fetchTrainingsPopular, updateTrainingCard
} from '../api-actions/api-actions';
import {RangeConstraint, TrainingState} from '../../types/states/training-state';
import {validationConstraints} from '../../validation-constraints';
import {TrainingCardInterface} from '../../types/training-card.interface';
import {fillTrainingCard, fillUpdateTrainingCard, getEmptyTrainingCard} from '../../helpers/fill-training-card';
import {createFeedback} from '../api-actions/feedback-actions';
import {fillCoachCardTraining} from '../../helpers/fill-coach-card-training';
import {fillSpecialOffers} from '../../helpers/fill-special-offers';
import {parseErrors} from '../../helpers/parse-register-errors';
import {CreateTrainingInterface} from '../../types/create-training.interface';
import {CreateTrainingErrorsInterface} from '../../types/create-training-errors.interface';
import {fillCreateTrainingErrors} from '../../helpers/get-new-create-training';

const initialState: TrainingState = {
  forYouTrainings: [],
  isForYouLoaded: false,
  isForYouLoading: false,
  specialOffers: [],
  isSpecialOffersLoaded: false,
  isSpecialOffersLoading: false,
  isPopularLoading: false,
  isPopularLoaded: false,
  popularTrainings: [],
  range : {
    calories: {...validationConstraints.training.caloriesCount as RangeConstraint},
    price: {...validationConstraints.training.price as RangeConstraint, max: NaN},
    rating: {...validationConstraints.training.rating as RangeConstraint}
  },
  isCoachTrainingsLoaded: false,
  isCoachTrainingsLoading: false,
  coachTrainings: [],

  isCatalogTrainingsLoaded: false,
  isCatalogTrainingsLoading: false,
  catalogTrainings: [],

  trainingCard: getEmptyTrainingCard(),
  isTrainingCardLoading: false,
  isTrainingCardLoaded: false,

  isCoachCardLoaded: false,
  isCoachCardLoading: false,
  coachCardTrainings: [],

  isPurchasesLoaded: false,
  isPurchasesLoading: false,
  purchases: [],

  isCreateTrainingError: false,
  createTraining: undefined as unknown as CreateTrainingInterface,
  createTrainingErrors: undefined as unknown as CreateTrainingErrorsInterface,
  isAnotherError: false
};

export const trainingProcess = createSlice({
  name: NameSpace.Training,
  initialState,
  reducers: {
    loadTrainingCard: (state, action: PayloadAction<TrainingCardInterface>) => {
      state.trainingCard = action.payload;
    },
    setIsTrainingCardLoading: (sate, action: PayloadAction<boolean>) => {
      sate.isTrainingCardLoading = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSpecialOffers.pending, (state) => {
        state.isSpecialOffersLoading = true;
        state.isSpecialOffersLoaded = false;
      })
      .addCase(fetchSpecialOffers.fulfilled, (state, action) => {
        state.isSpecialOffersLoading = false;
        state.isSpecialOffersLoaded = true;
        state.specialOffers = action.payload.map((training, index) =>
          ({...fillSpecialOffers(training), id: index}), );
      })
      .addCase(fetchSpecialOffers.rejected, (state, action) => {
        state.isForYouLoading = false;
      })
      .addCase(fetchTrainingsForYou.pending, (state) => {
        state.isForYouLoading = true;
        state.isForYouLoaded = false;
      })
      .addCase(fetchTrainingsForYou.fulfilled, (state, action) => {
        state.isForYouLoading = false;
        state.isForYouLoaded = true;
        state.forYouTrainings = [...action.payload];
      })
      .addCase(fetchTrainingsForYou.rejected, (state, action) => {
        state.isForYouLoading = false;
      })
      .addCase(fetchTrainingsPopular.pending, (state) => {
        state.isPopularLoading = true;
        state.isPopularLoaded = false;
      })
      .addCase(fetchTrainingsPopular.fulfilled, (state, action) => {
        state.isPopularLoading = false;
        state.isPopularLoaded = true;
        state.popularTrainings = [...action.payload];
      })
      .addCase(fetchTrainingsPopular.rejected, (state, action) => {
        state.isPopularLoading = false;
      })
      .addCase(fetchCoachTrainings.pending, (state) => {
        state.isCoachTrainingsLoading = true;
        state.isCoachTrainingsLoaded = false;
      })
      .addCase(fetchCoachTrainings.fulfilled, (state, action) => {
        state.isCoachTrainingsLoading = false;
        state.isCoachTrainingsLoaded = true;
        state.coachTrainings = [...action.payload.data];
        state.range.price.max = action.payload.maxPrice as number;
      })
      .addCase(fetchCoachTrainings.rejected, (state, action) => {
        state.isCoachTrainingsLoading = false;
      })
      .addCase(fetchCatalogTrainings.pending, (state) => {
        state.isCatalogTrainingsLoading = true;
        state.isCatalogTrainingsLoaded = false;
      })
      .addCase(fetchCatalogTrainings.fulfilled, (state, action) => {
        state.isCatalogTrainingsLoading = false;
        state.isCatalogTrainingsLoaded = true;
        state.catalogTrainings = [...action.payload.data];
        state.range.price.max = action.payload.maxPrice as number;
      })
      .addCase(fetchCatalogTrainings.rejected, (state, action) => {
        state.isPopularLoading = false;
      })
      .addCase(fetchTrainingCard.pending, (state) => {
        state.isTrainingCardLoading = true;
        state.isTrainingCardLoaded = false;
      })
      .addCase(fetchTrainingCard.fulfilled, (state, action) => {
        state.isTrainingCardLoading = false;
        state.isTrainingCardLoaded = true;
        state.trainingCard = fillTrainingCard(action.payload);
      })
      .addCase(fetchTrainingCard.rejected, (state, action) => {
        state.isTrainingCardLoading = false;
      })

      .addCase(updateTrainingCard.fulfilled, (state, action) => {
        state.trainingCard = fillUpdateTrainingCard(action.payload, state.trainingCard);
      })
      .addCase(createFeedback.fulfilled, (state, action) => {
        state.trainingCard = {...state.trainingCard, rating: action.payload.rating};
      })
      .addCase(fetchTrainingsCoachCard.pending, (state) => {
        state.isCoachCardLoading = true;
        state.isCoachCardLoaded = false;
      })
      .addCase(fetchTrainingsCoachCard.fulfilled, (state, action) => {
        state.isCoachCardLoading = false;
        state.isCoachCardLoaded = true;
        state.coachCardTrainings = action.payload.map((training) => fillCoachCardTraining(training));
      })
      .addCase(fetchTrainingsCoachCard.rejected, (state, action) => {
        state.isCoachCardLoading = false;
      })
      .addCase(fetchPurchases.pending, (state) => {
        state.isPurchasesLoading = true;
        state.isPurchasesLoaded = false;
      })
      .addCase(fetchPurchases.fulfilled, (state, action) => {
        state.isPurchasesLoading = false;
        state.isPurchasesLoaded = true;
        state.purchases = [...action.payload.data];
      })
      .addCase(fetchPurchases.rejected, (state, action) => {
        state.isPurchasesLoading = false;
      })

      .addCase(createTrainingAction.pending, (state) => {
        state.isCreateTrainingError = false;
        state.isAnotherError = false;
      })
      .addCase(createTrainingAction.fulfilled, (state, action) => {
        state.createTraining = undefined as unknown as CreateTrainingInterface;
        state.isCreateTrainingError = false;
        state.createTrainingErrors = undefined as unknown as CreateTrainingErrorsInterface;
      })

      .addCase(createTrainingAction.rejected, (state, action) => {
        if (action.error.code === 'Bad Request' && action.error.message) {
          const errors = parseErrors(action.error.message);
          state.createTrainingErrors = fillCreateTrainingErrors(errors);
          state.isCreateTrainingError = Object.values(state.createTrainingErrors).join('').length > 0;
          return;
        }
        state.isAnotherError = true;
      });

  }
});

export const {loadTrainingCard, setIsTrainingCardLoading} = trainingProcess.actions;

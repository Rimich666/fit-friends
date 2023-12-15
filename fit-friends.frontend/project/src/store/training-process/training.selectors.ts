import {RootState} from '../index';
import {NameSpace} from '../../settings';
import {TrainingInterface} from '../../types/training.interface';
import {createSelector} from '@reduxjs/toolkit';
import {fillTrainingMiniCard} from '../../helpers/fill-training-card';
import {ComponentVariant} from '../../component-variant';
import {PopularTrainingItemProps} from '../../components/main-page/popular-training/popular-training.item';
import {SpecialOfferInterface} from '../../components/main-page/special-offer/special-offer.item';
import {CreateTrainingErrorsInterface} from '../../types/create-training-errors.interface';
import {UpdateTrainingErrorInterface} from '../../types/update-training-error.interface';

export const selectIsForYouLoading = (state: RootState): boolean => state[NameSpace.Training].isForYouLoading;

export const selectTrainingsForYou = (state: RootState): TrainingInterface[] => state[NameSpace.Training].forYouTrainings;

export const selectIsSpecialOffersLoading = (state: RootState): boolean => state[NameSpace.Training].isSpecialOffersLoading;

export const selectSpecialOffers = (state: RootState): SpecialOfferInterface[] => state[NameSpace.Training].specialOffers;

export const selectIsPopularLoading = (state: RootState): boolean => state[NameSpace.Training].isPopularLoading;

export const selectTrainingsPopular = (state: RootState): TrainingInterface[] => state[NameSpace.Training].popularTrainings;

export const selectType = (state: RootState, type: string) => type;

export const selectRangeConstraints = (state: RootState) => state[NameSpace.Training].range;

export const makeSelectRangeConstraint = createSelector([selectType, selectRangeConstraints],
  (type, ranges) => ranges[type as keyof typeof ranges]);

export const selectCard = (state: RootState) => state[NameSpace.Training].trainingCard;

export const selectVariant = (state: RootState, variant: ComponentVariant) => variant;

export const selectCoachTrainings = (state: RootState) => state[NameSpace.Training].coachTrainings
  .map((training) => fillTrainingMiniCard(training));

export const selectCatalogTrainings = (state: RootState) => state[NameSpace.Training].catalogTrainings
  .map((training) => fillTrainingMiniCard(training));

export const selectIsCatalogLoading = (state: RootState) => state[NameSpace.Training].isCatalogTrainingsLoading;

export const selectIsCoachTrainingLoading = (state: RootState) => state[NameSpace.Training].isCoachTrainingsLoading;

export const selectIsPurchasesLoading = (state: RootState) => state[NameSpace.Training].isPurchasesLoading;

export const selectPurchases = (state: RootState) => state[NameSpace.Training].purchases
  .map((training) => fillTrainingMiniCard(training));

export const makeSelectIsTrainingsLoading = createSelector(
  [selectVariant, selectIsCatalogLoading, selectIsCoachTrainingLoading, selectIsPurchasesLoading],
  (variant, catalog, trainings, purchases) => {
    if (variant === ComponentVariant.trainingCatalog) {
      return catalog;
    }
    if (variant === ComponentVariant.purchases) {
      return purchases;
    }
    return trainings;
  }
);

export const makeSelectTrainings = createSelector(
  [selectVariant, selectCatalogTrainings, selectCoachTrainings, selectPurchases],
  (variant, catalog, trainings, purchases) => {
    if (variant === ComponentVariant.trainingCatalog) {
      return catalog;
    }
    if (variant === ComponentVariant.purchases) {
      return purchases;
    }
    return trainings;
  }
);

export const selectIsTrainingCardLoading = (state: RootState): boolean => state[NameSpace.Training].isTrainingCardLoading;

export const selectCoachCardTrainings = (state: RootState): PopularTrainingItemProps[] =>
  state[NameSpace.Training].coachCardTrainings;

export const selectIsCoachCardLoading = (state: RootState): boolean => state[NameSpace.Training].isCoachCardLoading;

export const selectIsCoachCardLoaded = (state: RootState): boolean => state[NameSpace.Training].isCoachCardLoaded;

export const selectTrainingsForCoachCard = createSelector(
  [selectCoachCardTrainings, selectIsCoachCardLoading, selectIsCoachCardLoaded], (
    trainings, isLoading, isLoaded
  ) => ({trainings, isLoading, isLoaded}));

export const selectCreateTrainingError = (state: RootState): CreateTrainingErrorsInterface =>
  state[NameSpace.Training].createTrainingErrors;
export const selectIsCreateTrainingError = (state: RootState): boolean =>
  state[NameSpace.Training].isCreateTrainingError;

export const selectCreateTraining =
  createSelector([selectCreateTrainingError, selectIsCreateTrainingError],
    (createTrainingErrors, isCreateTrainingError) =>
      ({createTrainingErrors, isCreateTrainingError}));

export const selectUpdateTrainingError = (state: RootState): UpdateTrainingErrorInterface =>
  state[NameSpace.Training].updateTrainingErrors;
export const selectIsUpdateTrainingError = (state: RootState): boolean =>
  state[NameSpace.Training].isUpdateTrainingError;

export const selectUpdateTraining =
  createSelector([selectUpdateTrainingError, selectIsUpdateTrainingError],
    (updateTrainingErrors, isUpdateTrainingError) =>
      ({updateTrainingErrors, isUpdateTrainingError}));

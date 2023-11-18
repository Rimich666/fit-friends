import {RootState} from '../index';
import {NameSpace} from '../../settings';
import {TrainingInterface} from '../../types/training.interface';
import {createSelector} from '@reduxjs/toolkit';
import {fillTrainingMiniCard} from '../../helpers/fill-training-card';
import {ComponentVariant} from "../../component-variant";

export const selectIsForYouLoading = (state: RootState): boolean => state[NameSpace.Training].isForYouLoading;

export const selectTrainingsForYou = (state: RootState): TrainingInterface[] => state[NameSpace.Training].forYouTrainings;

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

export const makeSelectTrainings = createSelector(
  [selectVariant, selectCatalogTrainings, selectCoachTrainings],
  (variant, catalog, trainings) =>
    variant === ComponentVariant.trainingCatalog ? catalog : trainings
);

export const selectIsTrainingCardLoading = (state: RootState): boolean => state[NameSpace.Training].isTrainingCardLoading;



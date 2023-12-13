import {validationConstraints} from '../../validation-constraints';
import {RangeConstraint} from '../../types/states/training-state';
import {getEmptyTrainingCard} from '../../helpers/fill-training-card';
import {CreateTrainingErrorsInterface} from '../../types/create-training-errors.interface';
import {UpdateTrainingErrorInterface} from '../../types/update-training-error.interface';

export const makeInitialTrainingState = () => ({
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
  createTrainingErrors: undefined as unknown as CreateTrainingErrorsInterface,

  isUpdateTrainingError: false,
  updateTrainingErrors: undefined as unknown as UpdateTrainingErrorInterface,
  isAnotherError: false
});

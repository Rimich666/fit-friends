import {TrainingInterface} from '../training.interface';
import {TrainingCardInterface} from '../training-card.interface';
import {PopularTrainingItemProps} from '../../components/main-page/popular-training/popular-training.item';
import {SpecialOfferInterface} from '../../components/main-page/special-offer/special-offer.item';
import {CreateTrainingErrorsInterface} from '../create-training-errors.interface';
import {UpdateTrainingErrorInterface} from '../update-training-error.interface';
export type RangeConstraint = {
  min: number;
  max: number;
}

export type TrainingState = {
  isForYouLoaded: boolean;
  isForYouLoading: boolean;
  forYouTrainings: TrainingInterface[];
  specialOffers: SpecialOfferInterface[];
  isSpecialOffersLoaded: boolean;
  isSpecialOffersLoading: boolean;
  isPopularLoading: boolean;
  isPopularLoaded: boolean;
  popularTrainings: TrainingInterface[];
  range : {
    calories: RangeConstraint;
    price: RangeConstraint;
    rating: RangeConstraint;
  };

  trainingCard: TrainingCardInterface;
  isTrainingCardLoading: boolean;
  isTrainingCardLoaded: boolean;
  isCoachTrainingsLoaded: boolean;
  isCoachTrainingsLoading: boolean;
  coachTrainings: TrainingInterface[];
  isCatalogTrainingsLoaded: boolean;
  isCatalogTrainingsLoading: boolean;
  catalogTrainings: TrainingInterface[];
  isCoachCardLoaded: boolean;
  isCoachCardLoading: boolean;
  coachCardTrainings: PopularTrainingItemProps[];
  isPurchasesLoaded: boolean;
  isPurchasesLoading: boolean;
  purchases: TrainingInterface[];
  isCreateTrainingError: boolean;
  createTrainingErrors: CreateTrainingErrorsInterface;
  isUpdateTrainingError: boolean;
  updateTrainingErrors: UpdateTrainingErrorInterface;
  isAnotherError: boolean;
};

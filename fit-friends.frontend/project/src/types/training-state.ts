import {TrainingInterface} from './training.interface';
import {TrainingCardInterface} from './training-card.interface';
export type RangeConstraint = {
  min: number;
  max: number;
}

export type TrainingState = {
  isForYouLoaded: boolean;
  isForYouLoading: boolean;
  forYouTrainings: TrainingInterface[];
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
};

import {TrainingInterface} from './training.interface';

export type TrainingState = {
  isForYouLoaded: boolean;
  isForYouLoading: boolean;
  forYouTrainings: TrainingInterface[];
  isPopularLoading: boolean;
  isPopularLoaded: boolean;
  popularTrainings: TrainingInterface[];
};

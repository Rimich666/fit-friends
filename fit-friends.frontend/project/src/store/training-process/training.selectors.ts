import {RootState} from '../index';
import {NameSpace} from '../../settings';
import {TrainingInterface} from '../../types/training.interface';

export const selectIsForYouLoading = (state: RootState): boolean => state[NameSpace.Training].isForYouLoading;

export const selectTrainingsForYou = (state: RootState): TrainingInterface[] => state[NameSpace.Training].forYouTrainings;

export const selectIsPopularLoading = (state: RootState): boolean => state[NameSpace.Training].isPopularLoading;

export const selectTrainingsPopular = (state: RootState): TrainingInterface[] => state[NameSpace.Training].popularTrainings;

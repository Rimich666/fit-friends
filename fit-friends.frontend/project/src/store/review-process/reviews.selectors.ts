import {RootState} from '../index';
import {NameSpace} from '../../settings';
import {ReviewInterface} from '../../types/review.interface';

export const selectReviews = (state: RootState): ReviewInterface[] => state[NameSpace.Reviews].reviews;

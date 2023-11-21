import {RootState} from '../index';
import {NameSpace} from '../../settings';
import {BuyProps, FeedbackProps} from '../../types/popup-state';

export const selectBuyProps = (state: RootState): BuyProps => state[NameSpace.Popup].buy;

export const selectFeedbackProps = (state: RootState): FeedbackProps => state[NameSpace.Popup].feedback;

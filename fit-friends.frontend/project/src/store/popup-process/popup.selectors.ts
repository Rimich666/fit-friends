import {RootState} from '../index';
import {NameSpace} from '../../settings';
import {BuyProps} from '../../types/popup-state';

export const selectBuyProps = (state: RootState): BuyProps => state[NameSpace.Popup].buy;

import {RootState} from '../index';
import {NameSpace} from '../../settings';
import {MyOrderInterface} from '../../types/card-interface';

export const selectOrders = (state: RootState): MyOrderInterface[] => state[NameSpace.Orders].orders;

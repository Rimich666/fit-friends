import {RootState} from '../index';
import {NameSpace} from '../../settings';

export const selectBalance = (state: RootState): number => state[NameSpace.Balance].balance;

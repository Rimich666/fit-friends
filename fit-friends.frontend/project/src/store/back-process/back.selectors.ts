import {RootState} from '../index';
import {NameSpace} from '../../settings';
import {AppRoute} from '../../app-route';

export const selectBackRoute = (state: RootState): AppRoute => state[NameSpace.Back].back;

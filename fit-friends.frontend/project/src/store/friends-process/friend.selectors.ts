import {RootState} from '../index';
import {NameSpace} from '../../settings';

export const selectFriends = (state: RootState) => state[NameSpace.Friend].friends;

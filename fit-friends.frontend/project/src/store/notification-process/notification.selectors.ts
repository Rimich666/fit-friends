import {RootState} from '../index';
import {NameSpace} from '../../settings';

export const selectNotifications = (state: RootState) => state[NameSpace.Notification].notifications;

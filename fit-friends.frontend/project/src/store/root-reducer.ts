import {combineReducers} from '@reduxjs/toolkit';
import {registerProcess} from './register-process/register-process';
import {NameSpace} from '../settings';
import {userProcess} from './user-process/user-process';
import {trainingProcess} from './training-process/training.process';
import {ordersProcess} from './orders-process/order.process';
import {reviewsProcess} from './review-process/review.process';
import {balanceProcess} from './balance-process/balance.process';
import {popupProcess} from './popup-process/popup.process';
import {backProcess} from './back-process/back.process';
import {friendProcess} from './friends-process/friends.process';
import {notificationProcess} from './notification-process/notification.process';

export const RootReducer = combineReducers({
  [NameSpace.Register]: registerProcess.reducer,
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Training]: trainingProcess.reducer,
  [NameSpace.Orders]: ordersProcess.reducer,
  [NameSpace.Reviews]: reviewsProcess.reducer,
  [NameSpace.Balance]: balanceProcess.reducer,
  [NameSpace.Popup]: popupProcess.reducer,
  [NameSpace.Back]: backProcess.reducer,
  [NameSpace.Friend]: friendProcess.reducer,
  [NameSpace.Notification]: notificationProcess.reducer
});

export type Reducer = ReturnType<typeof RootReducer>;

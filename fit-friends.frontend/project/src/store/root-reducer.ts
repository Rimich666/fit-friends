import {combineReducers} from '@reduxjs/toolkit';
import {registerProcess} from './register-process/register-process';
import {NameSpace} from '../settings';
import {userProcess} from './user-process/user-process';
import {trainingProcess} from './training-process/training.process';

export const RootReducer = combineReducers({
  [NameSpace.Register]: registerProcess.reducer,
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Training]: trainingProcess.reducer
});

export type Reducer = ReturnType<typeof RootReducer>;

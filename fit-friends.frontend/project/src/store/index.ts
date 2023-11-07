import {configureStore} from '@reduxjs/toolkit';
import {createAPI} from '../servises/api';
import {redirect} from './middlewares/redirect';
import {RootReducer} from './root-reducer';

export const api = createAPI();

export const store = configureStore({
  reducer: RootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import {createAction} from '@reduxjs/toolkit';
import {TypeAction} from './typeAction';
import {AppRoute} from '../settings';

export const redirectToRoute = createAction(TypeAction.redirectToRoute, (route: AppRoute) => ({
  payload: route
}));

import {createAction} from '@reduxjs/toolkit';
import {TypeAction} from './typeAction';


import {AppRoute} from "../app-route";

export const redirectToRoute = createAction(TypeAction.redirectToRoute, (route: AppRoute) => ({
  payload: route
}));

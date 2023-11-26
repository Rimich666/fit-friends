import {getSelfRole} from '../../servises/token';
import {Navigate, useParams} from 'react-router-dom';
import {AppRoute} from '../../app-route';
import {Role} from '../../enums';
import Main from '../../pages/main';
import {LoginMode} from '../../settings';
import Auth from '../../pages/auth';
import PersonalAccount from '../../pages/personal-account';
import MyTrainings from '../../pages/my-trainings';
import React from 'react';
import CreateTraining from '../../pages/create-training';
import MyOrders from '../../pages/my-orders';
import TrainingCatalog from '../../pages/training-catalog';
import UserCatalog from '../../pages/user-catalog';
import Purchases from '../../pages/purchases';
import SportsmanTrainingCard from '../../pages/sportsman-training-card';
import CoachTrainingCard from '../../pages/coach-training-card';

type SwitchRoleProps = {
  variant: AppRoute;
}
export default function SwitchRole({variant}: SwitchRoleProps): JSX.Element {
  const training = useParams().training;
  const role = getSelfRole();
  if (!role) {
    switch(variant) {
      case AppRoute.Login: return <Auth mode={LoginMode.Login}/>;
      case AppRoute.Register: return <Auth mode={LoginMode.Register}/>;
    }
    return (<Navigate to={AppRoute.Login}/>);
  }

  switch (variant) {
    case AppRoute.Main: return role === Role.coach ? <Navigate to={AppRoute.Coach}/> : <Main/>;
    case AppRoute.Office: return role === Role.coach ? <Navigate to={AppRoute.Coach}/> : <Navigate to={AppRoute.Sportsman}/>;
    case AppRoute.Coach: return role === Role.coach ? <PersonalAccount role={Role.coach}/> : <Navigate to={AppRoute.Sportsman}/>;
    case AppRoute.Sportsman: return role === Role.sportsman ? <PersonalAccount role={Role.sportsman}/> : <Navigate to={AppRoute.Coach}/>;
    case AppRoute.CoachTrainings: return role === Role.coach ? <MyTrainings/> : <Navigate to={AppRoute.Sportsman}/>;
    case AppRoute.CreateTraining: return role === Role.coach ? <CreateTraining/> : <Navigate to={AppRoute.Sportsman}/>;
    case AppRoute.CoachOrders: return role === Role.coach ? <MyOrders/> : <Navigate to={AppRoute.Sportsman}/>;
    case AppRoute.TrainingCatalog: return role === Role.sportsman ? <TrainingCatalog/> : <Navigate to={AppRoute.CoachTrainings}/>;
    case AppRoute.UserCatalog: return role === Role.sportsman ? <UserCatalog/> : <Navigate to={AppRoute.Coach}/>;
    case AppRoute.Purchases: return role === Role.sportsman ? <Purchases/> : <Navigate to={AppRoute.CoachOrders}/>;
    case AppRoute.SportsmanTraining: return role === Role.sportsman ? <SportsmanTrainingCard/> :
      <Navigate to={`${AppRoute.CoachTraining}/${training as string}`}/>;
    case AppRoute.CoachTraining: return role === Role.coach ? <CoachTrainingCard/> :
      <Navigate to={`${AppRoute.SportsmanTraining}/${training as string}`}/>;
    case AppRoute.Login: return <Navigate to={AppRoute.Main}/>;
    case AppRoute.Register: return <Navigate to={AppRoute.Main}/>;
  }
  return (<Navigate to={AppRoute.Intro}/>);
}

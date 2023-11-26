import {Navigate, Route, Routes} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Intro from '../../pages/intro';
import {Role} from '../../enums';
import {getSelfRole} from '../../servises/token';
import Friends from '../../pages/friends';
import {AppRoute, RouteParam} from '../../app-route';
import useFetchSelf from '../../hooks/use-fetch-self';
import SportsmanCard from '../../pages/sportsman-card';
import CoachCard from '../../pages/coach-card';
import SwitchRole from './switch-role';

function App(): JSX.Element {
  useFetchSelf();
  return (
    <Routes>
      <Route path={AppRoute.Root}>
        <Route index element={<Navigate to={AppRoute.Intro}/>}/>
        <Route path={AppRoute.Intro} element={<Intro />}/>
        <Route path={AppRoute.Main} element={ <SwitchRole variant={AppRoute.Main}/>}/>
        <Route path={AppRoute.Office} element={<SwitchRole variant={AppRoute.Office}/>}/>
        <Route path={AppRoute.Coach} element={<SwitchRole variant={AppRoute.Coach}/>}/>
        <Route path={AppRoute.Sportsman} element={<SwitchRole variant={AppRoute.Sportsman}/>}/>
        <Route path={AppRoute.CoachTrainings} element={<SwitchRole variant={AppRoute.CoachTrainings}/>}/>
        <Route path={AppRoute.CreateTraining} element={<SwitchRole variant={AppRoute.CreateTraining}/>}/>
        <Route path={AppRoute.Friends} element={<Friends role={getSelfRole() as Role}/>}/>
        <Route path={AppRoute.CoachOrders} element={<SwitchRole variant={AppRoute.CoachOrders}/>}/>
        <Route path={AppRoute.TrainingCatalog} element={<SwitchRole variant={AppRoute.TrainingCatalog}/>}/>
        <Route path={AppRoute.UserCatalog} element={<SwitchRole variant={AppRoute.UserCatalog}/>}/>
        <Route path={AppRoute.Purchases} element={<SwitchRole variant={AppRoute.Purchases}/>}/>

        <Route path={`${AppRoute.SportsmanTraining}/${RouteParam.Training}`}
          element={<SwitchRole variant={AppRoute.SportsmanTraining}/>}
        />
        <Route
          path={`${AppRoute.CoachTraining}/${RouteParam.Training}`}
          element={<SwitchRole variant={AppRoute.CoachTraining}/>}
        />

        <Route path={`${AppRoute.UserCard}/${RouteParam.UserId}`} element={<SportsmanCard/>}/>
        <Route path={`${AppRoute.CoachCard}/${RouteParam.UserId}`} element={<CoachCard/>}/>
        <Route path={AppRoute.Login} element={<SwitchRole variant={AppRoute.Login}/>}/>
        <Route path={`${AppRoute.Register}`} element={<SwitchRole variant={AppRoute.Register}/>}/>
      </Route>
      {/*<Route path="*" element={<NotFound />}/>*/}
    </Routes>
  );
}

export default App;

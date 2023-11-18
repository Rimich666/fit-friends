import {Navigate, Route, Routes} from 'react-router-dom';
import {LoginMode} from '../../settings';
import 'react-toastify/dist/ReactToastify.css';
import Intro from '../../pages/intro';
import Auth from '../../pages/auth';
import Main from '../../pages/main';
import {Role} from '../../enums';
import PersonalAccount from '../../pages/personal-account';
import {getSelfRole} from '../../servises/token';
import MyTrainings from '../../pages/my-trainings';
import CreateTraining from '../../pages/create-training';
import CoachFriends from '../../pages/coach-friends';
import MyOrders from '../../pages/my-orders';
import {AppRoute, RouteParam} from '../../app-route';
import TrainingCatalog from '../../pages/training-catalog';
import CoachTrainingCard from '../../pages/coach-training-card';
import SportsmanTrainingCard from '../../pages/sportsman-training-card';
import useFetchSelf from '../../hooks/use-fetch-self';

function App(): JSX.Element {
  const role = getSelfRole();
  useFetchSelf();
  return (
    <Routes>
      <Route path={AppRoute.Root}>
        <Route index element={<Navigate to={AppRoute.Intro}/>}/>
        <Route path={AppRoute.Intro} element={<Intro />}/>
        <Route path={AppRoute.Main} element={role === Role.sportsman ? <Main/> : <Navigate to={AppRoute.Coach}/>}/>
        <Route path={AppRoute.Coach} element={<PersonalAccount role={Role.coach}/>}/>
        <Route path={AppRoute.CoachTrainings} element={<MyTrainings/>}/>
        <Route path={AppRoute.CreateTraining} element={<CreateTraining/>}/>
        <Route path={AppRoute.CoachFriends} element={<CoachFriends/>}/>
        <Route path={AppRoute.CoachOrders} element={<MyOrders/>}/>
        <Route path={AppRoute.TrainingCatalog} element={<TrainingCatalog/>}/>
        {/*<Route path={AppRoute.CoachTraining} element={<CoachTrainingCard/>}/>*/}
        <Route path={`${AppRoute.SportsmanTraining}/${RouteParam.Training}`}
          element={<SportsmanTrainingCard/>}
        />
        <Route
          path={`${AppRoute.CoachTrainings}/${RouteParam.Training}`}
          element={<CoachTrainingCard />}
        />
        {/*  <PrivateRoute>*/}
        {/*    <Product />*/}
        {/*  </PrivateRoute>*/}
        {/*}*/}
        {/*/>*/}
        {/*<Route path={`${AppRoute.EditProduct}/${RouteParam.ProductId}`} element={*/}
        {/*  <PrivateRoute>*/}
        {/*    <EditProduct />*/}
        {/*  </PrivateRoute>*/}
        {/*}*/}
        {/*/>*/}
        {/*<Route path={AppRoute.AddProduct} element={*/}
        {/*  <PrivateRoute>*/}
        {/*    <AddProduct />*/}
        {/*  </PrivateRoute>*/}
        {/*}*/}
        {/*/>*/}
        <Route path={AppRoute.Login} element={<Auth mode={LoginMode.Login}/>}/>
        <Route path={`${AppRoute.Register}`} element={<Auth mode={LoginMode.Register}/>}/>
      </Route>
      {/*<Route path="*" element={<NotFound />}/>*/}
    </Routes>
  );
}

export default App;

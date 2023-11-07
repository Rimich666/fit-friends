import {Navigate, Route, Routes} from 'react-router-dom';
import {AppRoute, LoginMode} from '../../settings';
import 'react-toastify/dist/ReactToastify.css';
import Intro from '../../pages/intro';
import Auth from '../../pages/auth';
import Main from '../../pages/main';
import {Role} from '../../enums';
import PersonalAccount from '../../pages/personal-account';
import {getSelfRole} from '../../servises/token';

function App(): JSX.Element {
  const role = getSelfRole();
  return (
    <Routes>
      <Route path={AppRoute.Root}>
        <Route index element={<Navigate to={AppRoute.Intro}/>}/>
        <Route path={AppRoute.Intro} element={<Intro />}/>
        <Route path={AppRoute.Main} element={role === Role.sportsman ? <Main/> : <Navigate to={AppRoute.Coach}/>}/>
        <Route path={AppRoute.Coach} element={<PersonalAccount role={Role.coach}/>}/>

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

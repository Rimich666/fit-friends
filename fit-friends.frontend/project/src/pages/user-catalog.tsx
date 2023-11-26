import Header from '../components/header/header';
import CatalogMain from '../components/training-catalog/main/catalog.main';
import {ComponentVariant} from '../component-variant';
import useFetchUsers from '../hooks/use-fetch-users';
import {useAppDispatch} from '../hooks';
import {setBack} from '../store/back-process/back.process';
import {AppRoute} from '../app-route';
import {setBackRoute} from '../utils/back-route';

export default function UserCatalog(): JSX.Element {
  useFetchUsers({page: 1});
  useAppDispatch()(setBack(AppRoute.UserCatalog));
  setBackRoute(AppRoute.UserCatalog);
  return (
    <>
      <Header/>
      <CatalogMain variant={ComponentVariant.userCatalog}/>
    </>
  );
}

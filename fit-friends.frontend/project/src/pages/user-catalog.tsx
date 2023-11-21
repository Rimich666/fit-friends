import Header from '../components/header/header';
import CatalogMain from '../components/training-catalog/main/catalog.main';
import {ComponentVariant} from '../component-variant';
import useFetchUsers from '../hooks/use-fetch-users';

export default function UserCatalog(): JSX.Element {
  useFetchUsers({page: 1});
  return (
    <>
      <Header/>
      <CatalogMain variant={ComponentVariant.userCatalog}/>
    </>
  );
}

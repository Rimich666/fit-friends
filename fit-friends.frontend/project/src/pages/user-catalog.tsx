import Header from '../components/header/header';
import CatalogMain from '../components/training-catalog/main/catalog.main';
import {ComponentVariant} from '../component-variant';

export default function UserCatalog(): JSX.Element {
  return (
    <>
      <Header/>
      <CatalogMain variant={ComponentVariant.userCatalog}/>
    </>
  );
}

import Header from '../components/header/header';
import CatalogMain from '../components/training-catalog/main/catalog.main';
import {ComponentVariant} from '../component-variant';
import useFetchCatalogTrainings from '../hooks/use-fetch-catalog-trainings';


export default function TrainingCatalog(): JSX.Element {
  useFetchCatalogTrainings({page: 1});
  return (
    <>
      <Header/>
      <CatalogMain variant={ComponentVariant.trainingCatalog}/>
    </>
  );
}

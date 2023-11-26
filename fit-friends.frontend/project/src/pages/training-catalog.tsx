import Header from '../components/header/header';
import CatalogMain from '../components/training-catalog/main/catalog.main';
import {ComponentVariant} from '../component-variant';
import useFetchCatalogTrainings from '../hooks/use-fetch-catalog-trainings';
import {useAppDispatch} from '../hooks';
import {setBack} from '../store/back-process/back.process';
import {AppRoute} from '../app-route';
import {setBackRoute} from '../utils/back-route';


export default function TrainingCatalog(): JSX.Element {
  useAppDispatch()(setBack(AppRoute.TrainingCatalog));
  useFetchCatalogTrainings({page: 1});
  setBackRoute(AppRoute.TrainingCatalog);
  return (
    <>
      <Header/>
      <CatalogMain variant={ComponentVariant.trainingCatalog}/>
    </>
  );
}

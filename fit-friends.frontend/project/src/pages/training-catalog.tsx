import Header from '../components/header/header';
import CatalogMain from '../components/training-catalog/main/catalog.main';
import {ComponentVariant} from '../component-variant';
import useFetchCatalogTrainings from '../hooks/use-fetch-catalog-trainings';
import {useAppDispatch} from '../hooks';
import {setBack} from '../store/back-process/back.process';
import {AppRoute} from '../app-route';
import {setBackRoute} from '../utils/back-route';
import {Helmet} from 'react-helmet';


export default function TrainingCatalog(): JSX.Element {
  useAppDispatch()(setBack(AppRoute.TrainingCatalog));
  useFetchCatalogTrainings({page: 1});
  setBackRoute(AppRoute.TrainingCatalog);
  return (
    <>
      <Helmet>
        <title>Каталог тренировок — FitFriends</title>
      </Helmet>
      <Header/>
      <CatalogMain variant={ComponentVariant.trainingCatalog}/>
    </>
  );
}

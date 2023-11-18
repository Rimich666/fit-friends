import Header from '../components/header/header';
import CatalogMain from '../components/training-catalog/main/catalog.main';
import {ComponentVariant} from '../component-variant';
import useFetchCoachTrainings from '../hooks/use-fetch-coach-trainings';

export default function MyTrainings(): JSX.Element {
  useFetchCoachTrainings({page: 1});
  return (
    <>
      <Header/>
      <CatalogMain variant={ComponentVariant.myTraining}/>
    </>
  );
}

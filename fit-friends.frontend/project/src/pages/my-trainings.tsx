import Header from '../components/header/header';
import CatalogMain from '../components/training-catalog/main/catalog.main';
import {ComponentVariant} from '../component-variant';
import useFetchCoachTrainings from '../hooks/use-fetch-coach-trainings';
import {Helmet} from 'react-helmet';

export default function MyTrainings(): JSX.Element {
  useFetchCoachTrainings({page: 1});
  return (
    <>
      <Helmet>
        <title>Мои тренировки — FitFriends</title>
      </Helmet>
      <Header/>
      <CatalogMain variant={ComponentVariant.myTraining}/>
    </>
  );
}

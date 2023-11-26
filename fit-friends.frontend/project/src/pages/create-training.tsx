import Header from '../components/header/header';
import CreateTrainingMain from '../components/create-training/main/create-training.main';
import {Helmet} from 'react-helmet';

export default function CreateTraining(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>Создать тренировку — FitFriends</title>
      </Helmet>
      <Header/>
      <CreateTrainingMain/>
    </>
  );
}

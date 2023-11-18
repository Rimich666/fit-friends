import Header from '../components/header/header';
import TrainingCardMain from '../components/training-card-page/training-card.main';
import {Role} from '../enums';
import {useParams} from 'react-router-dom';
import useFetchTrainingCard from '../hooks/use-fetch-training-card';
import useFetchFeedbacks from '../hooks/use-fetch-feedbacks';

export default function CoachTrainingCard(): JSX.Element {
  const id: number = parseInt(useParams().training as string, 10);
  useFetchTrainingCard(id);
  useFetchFeedbacks(id);
  return (
    <>
      <Header/>
      <TrainingCardMain role={Role.coach} id={id}/>
    </>
  );
}

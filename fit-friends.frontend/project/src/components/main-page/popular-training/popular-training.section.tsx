import PopularTrainingList from './popular-training.list';
import {useAppSelector} from '../../../hooks';
import {SpinnerCircular} from 'spinners-react';
import useFetchPopular from '../../../hooks/use-fetch-popular';
import {getPopularProps} from '../../../helpers/get-popular-props';
import {selectIsPopularLoading, selectTrainingsPopular} from '../../../store/training-process/training.selectors';

export default function PopularTrainingSection(): JSX.Element {
  useFetchPopular();
  const isLoading = useAppSelector(selectIsPopularLoading);
  const trainings = useAppSelector(selectTrainingsPopular);
  if (isLoading){
    return (<SpinnerCircular/>);
  }
  const popularProps = getPopularProps(trainings);

  return (
    <section className="popular-trainings">
      <div className="container">
        <PopularTrainingList {...{popularProps}}/>
      </div>
    </section>
  );
}

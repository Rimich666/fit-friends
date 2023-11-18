import TrainingCardSlider from '../../training-card-slider/training-card.slider';
import {useAppSelector} from '../../../hooks';
import {SpinnerCircular} from 'spinners-react';
import useFetchPopular from '../../../hooks/use-fetch-popular';
import {getPopularProps} from '../../../helpers/get-popular-props';
import {selectIsPopularLoading, selectTrainingsPopular} from '../../../store/training-process/training.selectors';
import {ComponentVariant} from '../../../component-variant';

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
        <TrainingCardSlider {...{trainingProps: popularProps, variant: ComponentVariant.popularTraining}}/>
      </div>
    </section>
  );
}

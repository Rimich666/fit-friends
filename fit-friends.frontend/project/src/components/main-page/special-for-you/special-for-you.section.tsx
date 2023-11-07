import {SpecialForYouItemProps} from './special-for-you.item';
import {SpinnerCircular} from 'spinners-react';
import {useAppSelector} from '../../../hooks';
import useFetchForYou from '../../../hooks/use-fetch-for-you';
import {selectIsForYouLoading, selectTrainingsForYou} from '../../../store/training-process/training.selectors';
import SpecialForYouList from './special-for-you.list';

export default function SpecialForYouSection(): JSX.Element {
  useFetchForYou();
  const isLoading = useAppSelector(selectIsForYouLoading);
  const trainings = useAppSelector(selectTrainingsForYou);
  if (isLoading){
    return (<SpinnerCircular/>);
  }
  const props: SpecialForYouItemProps[] = trainings.map((training) =>
    ({id: training.id, src: training.backgroundPath, type: training.trainingType}));
  return (
    <section className="special-for-you">
      <div className="container">
        <SpecialForYouList specialProps={props}/>
      </div>
    </section>
  );
}

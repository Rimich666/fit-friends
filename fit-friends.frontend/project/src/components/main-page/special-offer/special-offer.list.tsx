import SpecialOfferItem from './special-offer.item';
import {useState} from 'react';
import {useAppSelector} from '../../../hooks';
import {
  selectIsSpecialOffersLoading, selectSpecialOffers,
} from '../../../store/training-process/training.selectors';
import {SpinnerCircular} from 'spinners-react';
import useFetchSpecialOffers from '../../../hooks/use-fetch-special-offers';

export default function SpecialOfferList(): JSX.Element {
  const [active, setActive] = useState(0);
  useFetchSpecialOffers();
  const isLoading = useAppSelector(selectIsSpecialOffersLoading);
  const trainings = useAppSelector(selectSpecialOffers);
  if (isLoading){
    return (<SpinnerCircular/>);
  }

  const onClick = (value: number) => {
    setActive(value);
  };
  return (
    <ul className="special-offers__list">
      {trainings.map((prop, index) => (
        <SpecialOfferItem {...{...prop, callback: onClick, active}} key={prop.id}/>
      ))}
    </ul>
  );
}

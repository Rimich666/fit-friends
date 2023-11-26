import SpecialOfferItem, {SpecialOfferInterface} from './special-offer.item';
import {useState} from 'react';
import {useAppSelector} from '../../../hooks';
import {
  selectIsSpecialOffersLoading, selectSpecialOffers,
} from '../../../store/training-process/training.selectors';
import {SpinnerCircular} from 'spinners-react';
import useFetchSpecialOffers from '../../../hooks/use-fetch-special-offers';

const specialProps: SpecialOfferInterface[] = [
  {
    id: 0,
    src: '/img/content/promo-1.png',
    name: 'Fitball',
    text: 'Горячие предложения на тренировки на фитболе',
    newPrice: 1600,
    price: 2000,
    sup: 'за занятие',
  },
  {
    id: 1,
    src: '/img/content/promo-2.png',
    name: 'Fleksbend',
    text: 'Горячие предложения на Тренировки с резинкой для фитнеса',
    newPrice: 2400,
    price: 2800,
    sup: 'за занятие',
  },
  {
    id: 2,
    src: '/img/content/promo-3.png',
    name: 'Full Body Stretch',
    text: 'Горячие предложения на Комплекс упражнений на растяжку всего тела для новичков',
    newPrice: 1800,
    price: 2200,
    sup: 'за занятие',
  },
];

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

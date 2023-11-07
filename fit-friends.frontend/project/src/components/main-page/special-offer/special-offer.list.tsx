import SpecialOfferItem, {SpecialOfferInterface, SpecialOfferItemProps} from './special-offer.item';
import {useState} from "react";

const specialProps: SpecialOfferInterface[] = [
  {
    id: 0,
    src: '/img/content/promo-1.png',
    name: 'Fitball',
    text: 'Горячие предложения на тренировки на фитболе',
    price: 1600,
    oldPrice: 2000,
    sup: 'за занятие',
  },
  {
    id: 1,
    src: '/img/content/promo-2.png',
    name: 'Fleksbend',
    text: 'Горячие предложения на Тренировки с резинкой для фитнеса',
    price: 2400,
    oldPrice: 2800,
    sup: 'за занятие',
  },
  {
    id: 2,
    src: '/img/content/promo-3.png',
    name: 'Full Body Stretch',
    text: 'Горячие предложения на Комплекс упражнений на растяжку всего тела для новичков',
    price: 1800,
    oldPrice: 2200,
    sup: 'за занятие',
  },
];

export default function SpecialOfferList(): JSX.Element {
  const [active, setActive] = useState(0);
  const onClick = (value: number) => {
    setActive(value);
  };
  return (
    <ul className="special-offers__list">
      {specialProps.map((prop, index) => (
        <SpecialOfferItem {...{...prop, callback: onClick, active}} key={prop.id}/>
      ))}
    </ul>
  );
}

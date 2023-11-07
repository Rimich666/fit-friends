import React from 'react';

export const SlidersId = ['первый', 'второй', 'третий'] as const;

export interface SpecialOfferInterface {
  id: number;
  src: string;
  name: string;
  text: string;
  price: number;
  oldPrice: number;
  sup: string;
}

export interface SpecialOfferItemProps extends SpecialOfferInterface{
  active: number;
  callback: (value: number) => void;
}

export default function SpecialOfferItem({id, ...props}: SpecialOfferItemProps): JSX.Element {
  const clickHandle = (evt: React.FormEvent<HTMLButtonElement>) => {
    props.callback(parseInt(evt.currentTarget.value, 10));
  };

  return (
    <li className={`special-offers__item ${props.active === id ? 'is-active' : ''}`}>
      <aside className="promo-slider">
        <div className="promo-slider__overlay"></div>
        <div className="promo-slider__image">
          <img src={props.src} width={1040} height={469} alt="promo-photo"/>
        </div>
        <div className="promo-slider__header">
          <h3 className="promo-slider__title">{props.name}</h3>
          <div className="promo-slider__logo">
            <svg width="74" height="74" aria-hidden="true">
              <use xlinkHref="#logotype"></use>
            </svg>
          </div>
        </div>
        <span className="promo-slider__text">{props.text}</span>
        <div className="promo-slider__bottom-container">
          <div className="promo-slider__slider-dots">
            {SlidersId.map((sliderId, index) => (
              <button
                className={`${index === props.active ? 'promo-slider__slider-dot--active' : ''} promo-slider__slider-dot`}
                aria-label={`${sliderId} слайд`} key={sliderId} value={index} onClick={clickHandle}
              />
            ))}
          </div>
          <div className="promo-slider__price-container">
            <p className="promo-slider__price">{`${props.price} ₽`}</p>
            <p className="promo-slider__sup">{props.sup}</p>
            <p className="promo-slider__old-price">{`${props.price} ₽`}</p>
          </div>
        </div>
      </aside>
    </li>
  );
}

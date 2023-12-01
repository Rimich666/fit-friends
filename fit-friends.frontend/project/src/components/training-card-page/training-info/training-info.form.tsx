import {Gender, GenderHash, Role, TrainingTime, TrainingTimeHash, TrainingType, TrainingTypeText} from '../../../enums';
import Input from '../../input/input';
import {Inputs} from '../../input/inputs';
import TextArea from '../../text-area/text-area';
import {ComponentVariant} from '../../../component-variant';
import {useState} from 'react';
import {DISCOUNT} from '../../../settings';
import {useAppSelector} from '../../../hooks';
import {selectBalance} from '../../../store/balance-process/balance.selectors';

type TrainingInfoFormProps = {
  name: string;
  description: string;
  rating: number;
  type: TrainingType;
  gender: Gender;
  caloriesCount: number;
  time: TrainingTime;
  price: number;
  isDisabled: boolean;
  role: Role;
  isSpecialOffer: boolean;
  callbacks : {
    onInputPrice: (value: number) => void;
    onInputName: (text: string) => void;
    onInputDescription: (text: string) => void;
    onChangeDiscount: (value: boolean) => void;
    onBuy: () => void;
  };
}

export default function TrainingInfoForm(props: TrainingInfoFormProps): JSX.Element {
  const {onInputDescription, onInputPrice, onInputName, onChangeDiscount, onBuy} = props.callbacks;
  const [price, setPrice] = useState(props.price);
  const [isSpecial, setIsSpecial] = useState(props.isSpecialOffer);

  const count = useAppSelector(selectBalance);

  const clickHandle = () => {
    setIsSpecial(!isSpecial);
    onChangeDiscount(!isSpecial);
  };

  const onChangePrice = (text: string) => {
    if (isSpecial) {
      clickHandle();
    }
    const value = parseInt(text, 10);
    setPrice(value);
    onInputPrice(value);
  };

  return (
    <form action="#" method="get">
      <div className="training-info__form-wrapper">
        <div className="training-info__info-wrapper">
          <Input {...{...Inputs.cardTrainingName, value: props.name, errorMessage: '',
            variant: ComponentVariant.trainingCard, callback: onInputName, disabled: props.isDisabled}}
          />
          <TextArea callback={onInputDescription} errorMessage={''} class={''} label={'Описание тренировки'}
            value={props.description} variant={ComponentVariant.trainingCard} disabled={props.isDisabled}
          />
        </div>
        <div className="training-info__rating-wrapper">
          <div className="training-info__input training-info__input--rating">
            <label>
              <span className="training-info__label">Рейтинг</span>
              <span className="training-info__rating-icon">
                <svg width="18" height="18" aria-hidden="true">
                  <use xlinkHref="#icon-star"/>
                </svg>
              </span>
              <input type="number" name="rating" value={props.rating} disabled/>
            </label>
          </div>
          <ul className="training-info__list">
            <li className="training-info__item">
              <div className="hashtag hashtag--white">
                <span>{`#${TrainingTypeText[props.type].toLowerCase()}`}</span>
              </div>
            </li>
            <li className="training-info__item">
              <div className="hashtag hashtag--white">
                <span>{`#${GenderHash[props.gender]}`}</span>
              </div>
            </li>
            <li className="training-info__item">
              <div className="hashtag hashtag--white">
                <span>{`#${props.caloriesCount}ккал`}</span>
              </div>
            </li>
            <li className="training-info__item">
              <div className="hashtag hashtag--white">
                <span>{`#${TrainingTimeHash[props.time]}минут`}</span>
              </div>
            </li>
          </ul>
        </div>
        <div className="training-info__price-wrapper">
          {props.isDisabled &&
            <div className="training-info__input training-info__input--price">
              <label>
                <span className="training-info__label">Стоимость</span>
                <input type="text" name="price" value={`${props.price} ₽`} disabled={props.isDisabled}/>
              </label>

              <div className="training-info__error">Введите число</div>
            </div>}
          {!props.isDisabled &&
            <Input {...{...Inputs.cardTrainingPrice,
              value: (isSpecial ? Math.round(price / 100 * (100 - DISCOUNT)) : price).toString(), errorMessage: '',
              variant: ComponentVariant.trainingCard, callback: onChangePrice, disabled: props.isDisabled}}
            />}
          {props.role === Role.coach && (
            <button className="btn-flat btn-flat--light btn-flat--underlined training-info__discount" type="button"
              disabled={props.isDisabled} onClick={clickHandle}
            >
              <svg width="14" height="14" aria-hidden="true">
                <use xlinkHref="#icon-discount"/>
              </svg>
              <span>{isSpecial ? 'Отменить скидку' : 'Сделать скидку 10%'}</span>
            </button>
          )}
          {props.role === Role.sportsman && (
            <button className="btn training-info__buy" type="button" disabled={count > 0} onClick={onBuy}>Купить</button>
          )}
        </div>
      </div>
    </form>
  );
}

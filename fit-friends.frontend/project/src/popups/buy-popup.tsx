import {useAppDispatch, useAppSelector} from '../hooks';
import {selectBuyProps} from '../store/popup-process/popup.selectors';
import {useState} from 'react';
import {PaymentOption, PurchaseType} from '../enums';
import PaymentItem from './payment.item';
import {createOrderAction} from '../store/api-actions/api-actions';
import {addBalance} from "../store/api-actions/balance-actions";

type BuyPopupProps = {
  onClose: () => void;
}

export default function BuyPopup({onClose}: BuyPopupProps): JSX.Element {
  const [count, setCount] = useState(0);
  const [sum, setSum] = useState(0);
  const [paymentOption, setPaymentOption] = useState(undefined as unknown as PaymentOption);
  const {src, name, price, trainingId} = useAppSelector(selectBuyProps);
  const dispatch = useAppDispatch();

  const minus = () => {
    setCount(count - 1);
    setSum((count - 1) * price);
  };

  const plus = () => {
    setCount(count + 1);
    setSum((count + 1) * price);
  };

  const onPaymentClick = (value: PaymentOption, isCheck: boolean) => {
    setPaymentOption(isCheck ? value : undefined as unknown as PaymentOption);
  };

  const buyHandle = () => {
    dispatch(createOrderAction({
      count: count,
      paymentOption: paymentOption,
      price: price,
      purchaseType: PurchaseType.membership,
      total: sum,
      trainingId: trainingId
    }));
    dispatch(addBalance({count, trainingId}));
    onClose();
  };

  return (
    <div className="popup__content popup__content--purchases">
      <div className="popup__product">
        <div className="popup__product-image">
          <picture>
            <img src={src} width="98" height="80" alt=""/>
          </picture>
        </div>
        <div className="popup__product-info">
          <h3 className="popup__product-title">{name}</h3>
          <p className="popup__product-price">{`${price} ₽`}</p>
        </div>
        <div className="popup__product-quantity">
          <p className="popup__quantity">Количество</p>
          <div className="input-quantity">
            <button className="btn-icon btn-icon--quantity" type="button" aria-label="minus" disabled={count === 0}
              onClick={minus}
            >
              <svg width="12" height="12" aria-hidden="true">
                <use xlinkHref="#icon-minus"/>
              </svg>
            </button>
            <div className="input-quantity__input">
              <label>
                <input type="text" value={count} size={2} readOnly/>
              </label>
            </div>
            <button className="btn-icon btn-icon--quantity" type="button" aria-label="plus" onClick={plus}>
              <svg width="12" height="12" aria-hidden="true">
                <use xlinkHref="#icon-plus"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <section className="payment-method">
        <h4 className="payment-method__title">Выберите способ оплаты</h4>
        <ul className="payment-method__list">
          {Object.keys(PaymentOption).map((key) =>
            <PaymentItem option={key as PaymentOption} isChecked={key === paymentOption} callback={onPaymentClick} key={key}/>)}
        </ul>
      </section>
      <div className="popup__total">
        <p className="popup__total-text">Итого</p>
        <svg className="popup__total-dash" width="310" height="2" aria-hidden="true">
          <use xlinkHref="#dash-line"/>
        </svg>
        <p className="popup__total-price">{`${sum}₽`}</p>
      </div>
      <div className="popup__button">
        <button className="btn" type="button" onClick={buyHandle}>Купить</button>
      </div>
    </div>

  );
}

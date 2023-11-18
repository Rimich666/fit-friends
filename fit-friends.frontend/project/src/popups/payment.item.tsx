import {PaymentOption} from '../enums';
import {PaymentLabel, PaymentLogo} from './options';
import React from 'react';

type PaymentItemProps = {
  option: PaymentOption;
  isChecked: boolean;
  callback: (value: PaymentOption, isCheck: boolean) => void;
}

export default function PaymentItem({option, isChecked, callback}: PaymentItemProps): JSX.Element {

  const clickHandle = (evt: React.FormEvent<HTMLInputElement>) => {
    callback(evt.currentTarget.value as PaymentOption, !isChecked);
  };

  return (
    <li className="payment-method__item">
      <div className="btn-radio-image">
        <label>
          <input type="radio" name="payment-purchases" aria-label={PaymentLabel[option]} value={option}
            checked={isChecked} onClick={clickHandle}
          />
          <span className="btn-radio-image__image">
            <svg width="58" height="20" aria-hidden="true">
              <use xlinkHref={PaymentLogo[option]}/>
            </svg>
          </span>
        </label>
      </div>
    </li>
  );
}

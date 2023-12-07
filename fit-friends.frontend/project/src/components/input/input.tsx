import React, {useEffect, useState} from 'react';
import {InputAttributes} from './inputs';

import {ComponentVariant} from '../../component-variant';

interface InputProps extends InputAttributes{
  callback: (value: string) => void;
  errorMessage: string;
  value?: string;
  disabled?: boolean;
  variant?: ComponentVariant;
}

export default function Input({errorMessage, value, ...props}: InputProps): JSX.Element {
  const [input, setInput] = useState(value ? value : '');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setInput(value as string);
  }, [value]);

  useEffect(() => {
    setIsError(errorMessage.length > 0);
  }, [errorMessage]);

  const inputHandle = (evt: React.FormEvent<HTMLInputElement>) => {
    setInput(evt.currentTarget.value);
    setIsError(false);
    props.callback(evt.currentTarget.value);
  };

  return props.variant === ComponentVariant.trainingCard ?
    (
      <div className={`training-info__input training-info__input--${props.class}`}>
        <label>
          <span className="training-info__label">{props.label}</span>
          <input type={props.type} name={props.name} value={input} onInput={inputHandle}
            disabled={props.disabled} data-testid={props.testId}
          />
        </label>
        <div className="training-info__error">{errorMessage}</div>
      </div>
    ) :
    (
      <div className={`custom-input ${props.class} ${isError ? 'custom-input--error' : ''}`}>
        <label>
          {props.label.length > 0 && <span className="custom-input__label">{props.label}</span>}
          <span className="custom-input__wrapper">
            <input type={props.type} name={props.name} autoComplete={props.autoComplete}
              value={input} onInput={inputHandle} disabled={props.disabled} data-testid={props.testId}
            />
            {props.text.length > 0 && <span className="custom-input__text">{props.text}</span>}
          </span>
          <span className="custom-input__error">{errorMessage}</span>
        </label>
      </div>
    );
}

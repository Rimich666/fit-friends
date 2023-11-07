import React, {useEffect, useState} from 'react';
import {InputAttributes} from './inputs';

interface InputProps extends InputAttributes{
  callback: (value: string) => void;
  errorMessage: string;
  value?: string;
  disabled?: boolean;
}

export default function Input({errorMessage, ...props}: InputProps): JSX.Element {
  const [input, setInput] = useState(props.value || '');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(errorMessage.length > 0);
  }, [errorMessage]);

  const inputHandle = (evt: React.FormEvent<HTMLInputElement>) => {
    setInput(evt.currentTarget.value);
    setIsError(false);
    props.callback(evt.currentTarget.value);
  };
  return (
    <div className={`custom-input ${props.class} ${isError ? 'custom-input--error' : ''}`}>
      <label>
        {props.label.length > 0 && <span className="custom-input__label">{props.label}</span>}
        <span className="custom-input__wrapper">
          <input type={props.type} name={props.name} autoComplete={props.autoComplete}
            value={input} onInput={inputHandle} disabled={props.disabled}
          />
          {props.text.length > 0 && <span className="custom-input__text">{props.text}</span>}
        </span>
        <span className="custom-input__error">{errorMessage}</span>
      </label>
    </div>
  );
}

import React, {useEffect, useState} from 'react';

import {ComponentVariant} from '../../component-variant';

interface TextAreaProps {
  callback: (value: string) => void;
  errorMessage: string;
  class: string;
  label?: string;
  value?: string;
  disabled?: boolean;
  variant?: ComponentVariant;
}

export default function TextArea({value, callback, errorMessage, ...props}: TextAreaProps): JSX.Element {
  const [input, setInput] = useState(value ? value : '');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setInput(value as string);
  }, [value]);

  useEffect(() => {
    setIsError(errorMessage.length > 0);
  }, [errorMessage]);

  const inputHandle = (evt: React.FormEvent<HTMLTextAreaElement>) => {
    setInput(evt.currentTarget.value);
    setIsError(false);
    callback(evt.currentTarget.value);
  };

  return props.variant === ComponentVariant.trainingCard ?
    (
      <div className="training-info__textarea">
        <label>
          <span className="training-info__label">{props.label}</span>
          <textarea name="description" onInput={inputHandle} disabled={props.disabled} value={input} data-testid={'text-area'}/>
        </label>
        <div className="training-info__error">{errorMessage}</div>
      </div>
    ) :
    (
      <div className={`custom-textarea ${props.class} ${isError ? 'custom-input--error' : ''}`}>
        <label>
          {props.label && <span className="custom-textarea__label">{props.label}</span>}
          <textarea name="description" placeholder=" " value={input} onInput={inputHandle} disabled={props.disabled}
            data-testid={'text-area'}
          />
          <span className="custom-input__error">{errorMessage}</span>
        </label>
      </div>
    );
}

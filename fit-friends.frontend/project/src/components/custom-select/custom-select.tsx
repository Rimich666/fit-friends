import React, {useEffect, useState} from 'react';
import {ComponentVariant} from '../../settings';

type CustomSelectProps = {
  title: string;
  options: {[k: string]: string};
  callback: (value: never) => void;
  errorMessage: string;
  value?: string;
  disabled?: boolean;
  variant?: ComponentVariant;
  mode?: string;
}

export default function CustomSelect({errorMessage, ...props}: CustomSelectProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [selection, setSelection] = useState('');
  const [isError, setIsError] = useState(false);
  const mode = props.mode || '';

  useEffect(() => {
    setIsError(errorMessage.length > 0);
  }, [errorMessage]);

  const arrowClickHandle = () => {
    setIsOpen(!isOpen);
  };

  const selectHandle = (env: React.FormEvent<HTMLLIElement>) => {
    setIsOpen(!isOpen);
    setIsError(false);
    setSelection(props.options[env.currentTarget.title]);
    props.callback(env.currentTarget.title as never);
  };

  return (
    <div className={
      `custom-select${isOpen ? ' is-open' : ''}${selection ? ' not-empty' : ''} ${isError ?
        'is-invalid' : ''} ${props.variant === ComponentVariant.update ? `${props.disabled ?
        'custom-select--readonly' : ''} user-info${mode}__select` : ''}`
    }
    >
      <span className="custom-select__label">{props.title}</span>
      {props.value && <div className="custom-select__placeholder">{props.value}</div>}
      <button
        className="custom-select__button"
        type="button"
        aria-label="Выберите одну из опций"
        onClick={arrowClickHandle}
      >
        <span className="custom-select__text">{selection}</span>
        <span className="custom-select__icon">
          <svg width="15" height="6" aria-hidden="true">
            <use xlinkHref="#arrow-down"></use>
          </svg>
        </span>
      </button>
      <span className="custom-select__error">{errorMessage}</span>
      <ul className="custom-select__list" role="listbox">
        {Object.keys(props.options).map((key) => (
          <li className="custom-select__item" title={key} key={key} onClick={selectHandle}>{props.options[key]}</li>
        ))}
      </ul>
    </div>
  );
}

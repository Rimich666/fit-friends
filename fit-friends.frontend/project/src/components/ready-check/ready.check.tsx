import React, {useEffect, useState} from 'react';
import {divClass, svgClass, text, name} from './options';
import {ComponentVariant} from "../../component-variant";

type RedyCheckProps = {
  callback: (checked: boolean) => void;
  isChecked: boolean;
  variant: ComponentVariant;
  isDisabled: boolean;
}

export default function ReadyCheck({isChecked, ...props}: RedyCheckProps): JSX.Element {
  const [isCheck, setIsCheck] = useState(isChecked);
  const changeHandle = (evt: React.FormEvent<HTMLInputElement>) => {
    props.callback(evt.currentTarget.checked);
    setIsCheck(!isCheck);
  };
  useEffect(() => {
    setIsCheck(isChecked);
  }, [isChecked]);
  return (
    <div className={divClass[props.variant as keyof typeof divClass]}>
      <label>
        <input type="checkbox" value={name[props.variant as keyof typeof name]}
          name={name[props.variant as keyof typeof name]} checked={isCheck}
          onChange={changeHandle} disabled={props.isDisabled}
        />
        <span className={svgClass[props.variant as keyof typeof svgClass]}>
          <svg width="9" height="6" aria-hidden="true">
            <use xlinkHref="#arrow-check"/>
          </svg>
        </span>
        <span className="custom-toggle__label">{text[props.variant as keyof typeof text]}</span>
      </label>
    </div>
  );
}

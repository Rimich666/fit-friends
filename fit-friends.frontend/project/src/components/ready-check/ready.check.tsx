import React, {useState} from 'react';
import {ComponentVariant} from '../../settings';
import {divClass, svgClass, text, name} from './options';

type RedyCheckProps = {
  callback: (checked: boolean) => void;
  checked: boolean;
  variant: ComponentVariant;
}

export default function ReadyCheck(props: RedyCheckProps): JSX.Element {
  const [checked, setChecked] = useState(props.checked);
  const changeHandle = (evt: React.FormEvent<HTMLInputElement>) => {
    props.callback(evt.currentTarget.checked);
    setChecked(!checked);
  };

  return (
    <div className={divClass[props.variant]}>
      <label>
        <input type="checkbox" value={name[props.variant]} name={name[props.variant]} checked={checked} onChange={changeHandle}/>
        <span className={svgClass[props.variant]}>
          <svg width="9" height="6" aria-hidden="true">
            <use xlinkHref="#arrow-check"/>
          </svg>
        </span>
        <span className="custom-toggle__label">{text[props.variant]}</span>
      </label>
    </div>
  );
}

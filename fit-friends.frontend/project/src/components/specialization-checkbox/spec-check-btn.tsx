import {TrainingType, TrainingTypeText} from '../../enums';
import React, {useEffect, useState} from 'react';

type SpecCheckBtnProps = {
  callback: (value: TrainingType, checked: boolean) => void;
  value: TrainingType;
  isChecked: boolean;
  disabled: boolean;
}

export default function SpecCheckBtn({isChecked, ...props}: SpecCheckBtnProps): JSX.Element {
  const [isCheck, setIsCheck] = useState(isChecked);
  const changeHandle = (evt: React.FormEvent<HTMLInputElement>) => {
    props.callback(evt.currentTarget.value as TrainingType, evt.currentTarget.checked);
    setIsCheck(!isCheck);
  };

  useEffect(() => {
    setIsCheck(isChecked);
  }, [isChecked]);

  return (
    <div className="btn-checkbox">
      <label>
        <input className="visually-hidden" type="checkbox" name="specialisation" disabled={props.disabled}
          value={props.value} checked={isCheck} onChange={changeHandle}
        />
        <span className="btn-checkbox__btn">{TrainingTypeText[props.value as keyof typeof TrainingTypeText]}</span>
      </label>
    </div>
  );
}

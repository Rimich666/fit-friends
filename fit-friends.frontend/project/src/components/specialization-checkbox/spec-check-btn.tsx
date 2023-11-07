import {TrainingType} from '../../enums';
import React, {useState} from 'react';

type SpecCheckBtnProps = {
  callback: (value: TrainingType, checked: boolean) => void;
  value: TrainingType;
  checked: boolean;
  disabled: boolean;
}

const text = {
  yoga: 'Йога',
  running: 'Бег',
  power: 'Силовые',
  aerobics: 'Аэробика',
  crossfit: 'Кроссфит',
  box: 'Бокс',
  pilates: 'Пилатес',
  stretching: 'Стрейчинг',
};

export default function SpecCheckBtn(props: SpecCheckBtnProps): JSX.Element {
  const [checked, setChecked] = useState(props.checked);
  const changeHandle = (evt: React.FormEvent<HTMLInputElement>) => {
    props.callback(evt.currentTarget.value as TrainingType, evt.currentTarget.checked);
    setChecked(!checked);
  };

  return (
    <div className="btn-checkbox">
      <label>
        <input className="visually-hidden" type="checkbox" name="specialisation" disabled={props.disabled}
          value={props.value} checked={checked} onChange={changeHandle}
        />
        <span className="btn-checkbox__btn">{text[props.value as keyof typeof text]}</span>
      </label>
    </div>
  );
}

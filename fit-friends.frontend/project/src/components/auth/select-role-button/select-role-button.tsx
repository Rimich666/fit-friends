import {Role} from '../../../enums';
import React from 'react';

type SelectRoleGroupButton = {
  callback: (value: Role) => void;
  value: Role;
  checked: boolean;
}

enum text {
  coach = 'Я хочу тренировать',
  sportsman = 'Я хочу тренироваться'
}

export default function SelectRoleButton(props: SelectRoleGroupButton): JSX.Element {
  const changeHandle = (evt: React.FormEvent<HTMLInputElement>) => {
    props.callback(Role[evt.currentTarget.value as keyof typeof Role]);
  };

  return (
    <div className="role-btn">
      <label>
        <input className="visually-hidden" type="radio" name="role" value={props.value} checked={props.checked}
          onChange={changeHandle}
        />
        <span className="role-btn__icon">
          <svg width="12" height="13" aria-hidden="true">
            <use xlinkHref="#icon-cup"></use>
          </svg>
        </span><span className="role-btn__btn">{text[props.value]}</span>
      </label>
    </div>
  );
}

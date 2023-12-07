import React from 'react';

type CustomToggleRadioProps = {
  name: string;
  text: string;
  value: string;
  checked: boolean;
  callback: (value: string) => void;
}

export default function CustomToggleRadio(props: CustomToggleRadioProps): JSX.Element {
  function changeHandle(env: React.FormEvent<HTMLInputElement>) {
    props.callback(env.currentTarget.value);
  }
  return (
    <div className="custom-toggle-radio__block">
      <label>
        <input type="radio"
          name={props.name}
          checked={props.checked}
          value={props.value}
          onChange={changeHandle}
          data-testid={`radio-button-${props.value}`}
        />
        <span className="custom-toggle-radio__icon"/>
        <span className="custom-toggle-radio__label">{props.text}</span>
      </label>
    </div>
  );
}

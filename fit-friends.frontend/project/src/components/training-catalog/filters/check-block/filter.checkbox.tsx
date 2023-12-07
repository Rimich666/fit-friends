import React, {useEffect, useState} from 'react';

type FilterCheckboxProps = {
  type: string;
  value: string;
  isCheck: boolean;
  callback: (value: string, isCheck: boolean) => void;
  label: string;
  formClass: string;
}

export default function FilterCheckbox({formClass, label, type, value, isCheck, callback}: FilterCheckboxProps): JSX.Element {
  const [isChecked, setIsChecked] = useState(isCheck);
  useEffect(() => {
    setIsChecked(isCheck);
  }, [isCheck]);

  const checkHandle = (evt: React.FormEvent<HTMLInputElement>) => {
    setIsChecked(!isChecked);
    callback(evt.currentTarget.value, !isChecked);
  };

  return (
    <li className={`${formClass}__check-list-item`}>
      <div className="custom-toggle custom-toggle--checkbox">
        <label>
          <input type="checkbox" value={value} name={type} checked={isChecked} onChange={checkHandle}
            data-testid={`check-${value}`}
          />
          <span className="custom-toggle__icon">
            <svg width="9" height="6" aria-hidden="true">
              <use xlinkHref="#arrow-check"/>
            </svg>
          </span>
          <span className="custom-toggle__label">{label}</span>
        </label>
      </div>
    </li>
  );
}

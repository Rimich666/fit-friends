import {Gender, GenderText} from '../../../enums';
import CustomToggleRadio from '../../custom-toggle-radio/custom-toggle-radio';
import {useEffect, useState} from 'react';

type UserGenderRadioGroupProps = {
  callback: (value: string) => void;
  value: Gender;
}

export default function UserGenderRadioGroup({callback, value}: UserGenderRadioGroupProps): JSX.Element {
  const [sex, setSex] = useState('');
  useEffect(() => {
    setSex(value);
  }, [value]);
  const onChangeValue = (changeValue: string) => {
    setSex(changeValue);
    callback(changeValue);
  };

  return (
    <div className="sign-up__radio"><span className="sign-up__label">Пол</span>
      <div className="custom-toggle-radio custom-toggle-radio--big">
        {Object.keys(Gender).map((key) => (
          <CustomToggleRadio {...{
            name: 'sex',
            text: GenderText[key as keyof typeof GenderText],
            value: key,
            checked: key === sex,
            callback: onChangeValue
          }} key={key}
          />))}
      </div>
    </div>
  );
}

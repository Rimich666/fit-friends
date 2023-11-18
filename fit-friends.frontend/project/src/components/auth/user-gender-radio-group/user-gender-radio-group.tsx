import {Gender, GenderText, GenderTrainingText} from '../../../enums';
import CustomToggleRadio from '../../custom-toggle-radio/custom-toggle-radio';
import {useEffect, useState} from 'react';

import {ComponentVariant} from "../../../component-variant";

type UserGenderRadioGroupProps = {
  callback: (value: string) => void;
  value: Gender;
  variant: ComponentVariant;
}

export default function UserGenderRadioGroup({callback, value, variant}: UserGenderRadioGroupProps): JSX.Element {
  const [sex, setSex] = useState('');
  useEffect(() => {
    setSex(value);
  }, [value]);
  const onChangeValue = (changeValue: string) => {
    setSex(changeValue);
    callback(changeValue);
  };

  return (
    <>
      {variant === ComponentVariant.register &&
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
        </div>}
      {variant === ComponentVariant.createTraining &&
        <div className="create-training__radio-wrapper">
          <span className="create-training__label">Кому подойдет тренировка</span>
          <br/>
          <div className="custom-toggle-radio create-training__radio">
            {Object.keys(Gender).map((key) => (
              <CustomToggleRadio {...{
                name: 'gender',
                text: GenderTrainingText[key as keyof typeof GenderTrainingText],
                value: key,
                checked: key === sex,
                callback: onChangeValue
              }} key={key}
              />))}
          </div>
        </div>}
    </>
  );
}

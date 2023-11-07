import {Level, LevelText, Role, roleClass} from '../enums';
import CustomToggleRadio from './custom-toggle-radio/custom-toggle-radio';
import {useEffect, useState} from 'react';

type LevelRadioBlockProps = {
  callback: (value: Level) => void;
  value: Level;
  role: Role;
}

export default function LevelRadioBlock({callback, value, role}: LevelRadioBlockProps): JSX.Element {
  const [level, setLevel] = useState('');
  useEffect(() => {
    setLevel(value);
  }, [value]);
  const onChangeValue = (changeValue: string) => {
    setLevel(changeValue);
    callback(changeValue as Level);
  };

  return (
    <div className={`questionnaire-${roleClass[role]}__block`}>
      <span className={`questionnaire-${roleClass[role]}__legend`}>Ваш уровень</span>
      <div className={`custom-toggle-radio custom-toggle-radio--big questionnaire-${roleClass[role]}__radio`}>
        {Object.keys(Level).map((key) => (
          <CustomToggleRadio {...{
            name: 'level',
            text: LevelText[key as keyof typeof LevelText],
            value: key as Level,
            checked: key === level,
            callback: onChangeValue
          }} key={key}
          />))}
      </div>
    </div>
  );
}

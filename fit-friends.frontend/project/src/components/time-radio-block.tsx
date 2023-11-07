import {TrainingTime} from '../enums';
import CustomToggleRadio from './custom-toggle-radio/custom-toggle-radio';
import {useEffect, useState} from 'react';

type TimeRadioBlockProps = {
  callback: (value: TrainingTime) => void;
  value: string;
}

export default function TimeRadioBlock({value, callback}: TimeRadioBlockProps): JSX.Element {
  const [time, setTime] = useState('');
  useEffect(() => {
    setTime(value);
  }, [value]);
  const onChangeValue = (changeValue: string) => {
    setTime(changeValue);
    callback(changeValue as TrainingTime);
  };

  return (
    <div className="questionnaire-user__block"><span className="questionnaire-user__legend">Сколько времени вы готовы уделять на тренировку в день</span>
      <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio">
        {Object.keys(TrainingTime).map((key) => (
          <CustomToggleRadio {...{
            name: 'time',
            text: `${key} мин`,
            value: key,
            checked: key === time,
            callback: onChangeValue
          }} key={key}
          />))}
      </div>
    </div>
  );
}

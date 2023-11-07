import {Inputs} from '../input/inputs';
import Input from '../input/input';
import React from 'react';

type CaloriesBlockProps = {
  callback: (field: string, value: number) => void;
  errors: {
    trainingCalories: string;
    daysCalories: string;
  };
  values: {
    trainingCalories: string;
    daysCalories: string;
  };
}

export default function CaloriesBlock({callback, errors, values}: CaloriesBlockProps): JSX.Element {

  const onInputLose = (value: string) => {
    callback('trainingCalories', parseInt(value,10));
  };

  const onInputWaste = (value: string) => {
    callback('daysCalories', parseInt(value, 10));
  };

  return (
    <div className="questionnaire-user__block">
      <div className="questionnaire-user__calories-lose">
        <span className="questionnaire-user__legend">Сколько калорий хотите сбросить</span>
        <Input {...{...Inputs.trainingCalories,
          callback: onInputLose, errorMessage: errors.trainingCalories, value: values.trainingCalories}}
        />
      </div>
      <div className="questionnaire-user__calories-waste">
        <span className="questionnaire-user__legend">Сколько калорий тратить в день</span>
        <Input {...{...Inputs.daysCalories,
          callback: onInputWaste, errorMessage: errors.daysCalories, value: values.daysCalories}}
        />
      </div>
    </div>
  );
}

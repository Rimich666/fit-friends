import {Role, roleClass, TrainingType} from '../../enums';
import SpecCheckBtn from './spec-check-btn';
import React, {useEffect, useState} from 'react';
import {SPECIALIZATION_LIMIT} from '../../settings';
import {ComponentVariant} from "../../component-variant";


type SpecializationCheckboxProps = {
  role: Role;
  trainingTypes: TrainingType[];
  errorMessage: string;
  variant?: ComponentVariant;
  callback: () => void;
  isDisabled: boolean;
}

export default function SpecializationCheckbox({errorMessage, ...props}: SpecializationCheckboxProps): JSX.Element {
  const [trainingTypes, setTrainingTypes] = useState<TrainingType[]>(props.trainingTypes);
  const [isLimit, setIsLimit] =
    useState(props.trainingTypes.length === SPECIALIZATION_LIMIT);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(errorMessage.length > 0);
  }, [errorMessage]);

  useEffect(() => {
    setTrainingTypes(props.trainingTypes);
    setIsLimit(props.trainingTypes.length === SPECIALIZATION_LIMIT);
  }, [props.trainingTypes]);

  const onChangeCheck = (value: TrainingType, checked: boolean) => {
    checked ? trainingTypes.push(TrainingType[value]) : trainingTypes.splice(trainingTypes.indexOf(value), 1);
    setIsError(false);
    setIsLimit(trainingTypes.length === SPECIALIZATION_LIMIT);
    props.callback();
  };

  if (props.variant === ComponentVariant.update) {
    return (
      <div className={`user-info-edit__section ${isError ? 'custom-input--error' : ''}`}>
        <h2 className="user-info-edit__title user-info-edit__title--specialization">Специализация</h2>
        <div className="specialization-checkbox user-info__specialization">
          {Object.keys(TrainingType).map((key) => (
            <SpecCheckBtn
              callback={onChangeCheck}
              value={key as TrainingType}
              isChecked={trainingTypes.includes(key as TrainingType)}
              disabled={props.isDisabled ? true : (!trainingTypes.includes(key as TrainingType) && isLimit)}
              key={key}
            />
          ))}
        </div>
        <span className="custom-input__error">{errorMessage}</span>
      </div>
    );
  }

  return (
    <div className={`questionnaire-${roleClass[props.role]}__block ${isError ? 'custom-input--error' : ''}`}>
      <span className={`questionnaire-${roleClass[props.role]}__legend`}>Ваша специализация (тип) тренировок</span>
      <div className={`specialization-checkbox questionnaire-${roleClass[props.role]}__specializations`}>
        {Object.keys(TrainingType).map((key) => (
          <SpecCheckBtn
            callback={onChangeCheck}
            value={key as TrainingType}
            isChecked={trainingTypes.includes(key as TrainingType)}
            disabled={!trainingTypes.includes(key as TrainingType) && isLimit}
            key={key}
          />
        ))}
      </div>
      <span className="custom-input__error">{errorMessage}</span>
    </div>
  );
}

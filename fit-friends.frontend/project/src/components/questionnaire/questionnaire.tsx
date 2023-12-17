import Logo from '../logo/logo';
import SpecializationCheckbox from '../specialization-checkbox/specialization.checkbox';
import {Level, Role, TrainingTime} from '../../enums';
import LevelRadioBlock from '../level-radio-block/level-radio-block';
import TimeRadioBlock from '../time-radio-block/time-radio-block';
import CaloriesBlock from './calories-block';
import React, {useEffect, useState} from 'react';
import {
  fillQuestionnaireErrors,
  getEmptyQuestionnaireErrors,
  getNewQuestionnaire,
  getQuestionnaire
} from '../../helpers/get-new-questionnaire';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {selectQuestion, selectRegisterUserRole,} from '../../store/register-process/register-selectors';
import Certificate from './certificate';
import Merits from './merits';
import {QuestionnaireInterface} from '../../types/auth/questionnaire.interface';
import {questionnaireValidators, validate} from '../../utils/validate';
import {setQuestionnaire} from '../../store/register-process/register-process';
import {registerAction} from '../../store/api-actions/api-actions';
import {QuestionnaireErrorsInterface} from '../../types/auth/questionnaire-errors.interface';
import {SpinnerCircular} from 'spinners-react';
import ReadyCheck from '../ready-check/ready.check';

import {ComponentVariant} from '../../component-variant';
import {Helmet} from 'react-helmet';

export default function Questionnaire(): JSX.Element {
  const [questionnaire, setQuestion] = useState(getNewQuestionnaire());
  const [errors, setErrors] = useState(getEmptyQuestionnaireErrors());

  const dispatch = useAppDispatch();

  const {
    questionnaireErrors,
    isQuestionnaireError,
    question,
  } = useAppSelector(selectQuestion);

  useEffect(() => {
    if (isQuestionnaireError) {
      setErrors({...questionnaireErrors});
      setQuestion({...question, trainingType: [...question.trainingType]});
    }
  }, [isQuestionnaireError]);

  const onSelectTime = (value: TrainingTime) => {
    questionnaire.trainingTime = value;
    errors.trainingTime = '';
  };

  const onSelectLevel = (value: Level) => {
    questionnaire.level = value;
    errors.level = '';
  };

  const onInputCalories = (field: string, value: number) => {
    questionnaire[field as keyof QuestionnaireInterface] = value;
    errors[field as keyof QuestionnaireErrorsInterface] = '';
  };

  const onSelectFile = (selectedFile: File[]) => {
    questionnaire.certificate.splice(0, questionnaire.certificate.length, ...selectedFile);
    errors.certificate = '';
  };

  const onInputMerits = (value: string) => {
    questionnaire.merits = value;
    errors.merits = '';
  };

  const onCheckReady = (value: boolean) => {
    questionnaire.isReady = value;
    errors.isReady = '';
  };

  const onChangeType = () => {
    errors.trainingType = '';
  };

  const submitHandle = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const validateErrors = validate(getQuestionnaire(questionnaire, role), questionnaireValidators);
    const isError = Object.values(validateErrors).join('').length > 0;
    if (isError){
      setErrors(fillQuestionnaireErrors(validateErrors));
      return;
    }
    if (Object.values(errors).join('').length === 0) {
      dispatch(setQuestionnaire(questionnaire));
      dispatch(registerAction());
    }
  };
  const role = useAppSelector(selectRegisterUserRole);
  if (!role) {
    return (<SpinnerCircular />);
  }

  return (
    <>
      <Helmet>
        <title>Опросник — FitFriends</title>
      </Helmet>
      <main>
        <Logo/>
        <div className="popup-form popup-form--questionnaire-user">
          <div className="popup-form__wrapper">
            <div className="popup-form__content">
              <div className="popup-form__form">
                <form method="get" onSubmit={submitHandle}>
                  <div className="questionnaire-user">
                    <h1 className="visually-hidden">Опросник</h1>
                    <div className="questionnaire-user__wrapper">
                      <SpecializationCheckbox
                        role={role}
                        trainingTypes={questionnaire.trainingType}
                        errorMessage={errors.trainingType}
                        callback={onChangeType}
                        isDisabled={false}
                      />
                      {role === Role.sportsman && <TimeRadioBlock value={TrainingTime['30 - 50']} callback={onSelectTime}/>}
                      <LevelRadioBlock role={role} callback={onSelectLevel} value={Level.beginner}
                        variant={ComponentVariant.register}
                      />
                      {role === Role.sportsman &&
                      <CaloriesBlock
                        callback={onInputCalories}
                        errors={{trainingCalories: errors.trainingCalories, daysCalories: errors.daysCalories}}
                        values={{trainingCalories: questionnaire.trainingCalories.toString(),
                          daysCalories: questionnaire.daysCalories.toString()}}
                      />}
                      {role === Role.coach && <Certificate errorMessage={errors.certificate} callback={onSelectFile}/>}
                      {role === Role.coach &&
                      <div className="questionnaire-coach__block">
                        <Merits callback={onInputMerits} errorMessage={errors.merits}/>
                        <ReadyCheck callback={onCheckReady} isChecked={questionnaire.isReady}
                          variant={ComponentVariant.register} isDisabled={false}
                        />
                      </div>}
                    </div>
                    <button className="btn questionnaire-user__button" type="submit">Продолжить</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

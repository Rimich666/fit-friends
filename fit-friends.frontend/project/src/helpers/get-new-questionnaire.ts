import {Level, Role, TrainingTime} from '../enums';
import {QuestionnaireInterface} from '../types/auth/questionnaire.interface';
import {QuestionnaireErrorsInterface} from '../types/auth/questionnaire-errors.interface';

export const getNewQuestionnaire = (): QuestionnaireInterface => (
  {
    certificate: [],
    merits: '',
    isReady: false,

    trainingTime: TrainingTime['30 - 50'],
    trainingCalories: 0,
    daysCalories: 0,

    level: Level.beginner,
    trainingType: []
  }
);

export const getEmptyQuestionnaireErrors = (): QuestionnaireErrorsInterface => (
  {
    certificate: '',
    merits: '',
    isReady: '',

    trainingTime: '',
    trainingCalories: '',
    daysCalories: '',

    level: '',
    trainingType: ''
  }
);

export const fillQuestionnaireErrors = (errors: {[k: string]: string}): QuestionnaireErrorsInterface => ({
  certificate: errors.certificate ? errors.certificate : '',
  merits: errors.merits ? errors.merits : '',
  isReady: errors.isReady ? errors.isReady : '',
  trainingTime: errors.trainingTime ? errors.trainingTime : '',
  trainingCalories: errors.trainingCalories ? errors.trainingCalories : '',
  daysCalories: errors.daysCalories ? errors.daysCalories : '',
  level: errors.level ? errors.level : '',
  trainingType: errors.trainingType ? errors.trainingType : '',
});


export const getQuestionnaire = (questionnaire: QuestionnaireInterface , role: Role) => {
  const {
    trainingTime,
    trainingCalories,
    daysCalories,
    ...coach} = questionnaire;
  const {
    certificate,
    merits,
    isReady,
    ...sportsman} = questionnaire;
  return role === Role.coach ? coach : sportsman;
};


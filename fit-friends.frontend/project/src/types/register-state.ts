import {RegisterUserInterface} from './register-user.interface';
import {QuestionnaireInterface} from './questionnaire.interface';
import {RegisterErrorsInterface} from './register-errors.interface';
import {QuestionnaireErrorsInterface} from './questionnaire-errors.interface';

export type RegisterState = {
  registerUser: RegisterUserInterface;
  questionnaire: QuestionnaireInterface;
  registerIsError: boolean;
  questionnaireIsError: boolean;
  registerErrors: RegisterErrorsInterface;
  questionnaireErrors: QuestionnaireErrorsInterface;
  isAnotherError: boolean;
  loginConflict: boolean;
};

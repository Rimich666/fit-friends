import {RegisterUserInterface} from '../auth/register-user.interface';
import {QuestionnaireInterface} from '../auth/questionnaire.interface';
import {RegisterErrorsInterface} from '../auth/register-errors.interface';
import {QuestionnaireErrorsInterface} from '../auth/questionnaire-errors.interface';
import {UserInterface} from '../user.interface';
import {CertificateInterface} from '../certificate.interface';

export type RegisterState = {
  registerUser: RegisterUserInterface;
  questionnaire: QuestionnaireInterface;
  registerIsError: boolean;
  questionnaireIsError: boolean;
  registerErrors: RegisterErrorsInterface;
  questionnaireErrors: QuestionnaireErrorsInterface;
  isAnotherError: boolean;
  loginConflict: boolean;
  currentUser: UserInterface;
  isCurrentUserLoaded: boolean;
  isCurrentUserLoading: boolean;
  certificate: CertificateInterface[];
};

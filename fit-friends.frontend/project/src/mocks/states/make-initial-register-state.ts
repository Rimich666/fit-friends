import {QuestionnaireInterface} from "../../types/auth/questionnaire.interface";
import {RegisterUserInterface} from "../../types/auth/register-user.interface";
import {RegisterErrorsInterface} from "../../types/auth/register-errors.interface";
import {QuestionnaireErrorsInterface} from "../../types/auth/questionnaire-errors.interface";
import {UserInterface} from "../../types/user.interface";
import {UpdateUserErrorsInterface} from "../../types/update-user-errors.interface";

export const makeInitialRegisterState = () => ({
  questionnaire: undefined as unknown as QuestionnaireInterface,
  questionnaireIsError: false,
  registerIsError: false,
  registerUser: undefined as unknown as RegisterUserInterface,
  registerErrors: undefined as unknown as RegisterErrorsInterface,
  questionnaireErrors: undefined as unknown as QuestionnaireErrorsInterface,
  isAnotherError: false,
  loginConflict: false,
  currentUser: undefined as unknown as UserInterface,
  isCurrentUserLoaded: false,
  isCurrentUserLoading: false,
  certificate: [],
  changeUserErrors: undefined as unknown as UpdateUserErrorsInterface,
  isChangeUserError: false,
});

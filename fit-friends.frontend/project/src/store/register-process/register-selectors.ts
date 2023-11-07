import { NameSpace } from '../../settings';
import {RootState} from '../index';
import {RegisterUserInterface} from '../../types/register-user.interface';
import {Role} from '../../enums';
import {RegisterErrorsInterface} from '../../types/register-errors.interface';
import {QuestionnaireErrorsInterface} from '../../types/questionnaire-errors.interface';
import {createSelector} from '@reduxjs/toolkit';
import {QuestionnaireInterface} from '../../types/questionnaire.interface';

export const selectRegisterUser = (state: RootState): RegisterUserInterface => state[NameSpace.Register].registerUser;

export const selectRegisterUserRole = (state: RootState): Role => state[NameSpace.Register].registerUser ?
  state[NameSpace.Register].registerUser.role : undefined as unknown as Role;

export const selectIsRegisterError = (state: RootState): boolean => state[NameSpace.Register].registerIsError;

export const selectRegisterError = (state: RootState): RegisterErrorsInterface =>
  state[NameSpace.Register].registerErrors;

export const selectQuestionnaire = (state: RootState): QuestionnaireInterface => state[NameSpace.Register].questionnaire;

export const selectIsQuestionnaireError = (state: RootState): boolean => state[NameSpace.Register].questionnaireIsError;

export const selectIsAnotherError = (state: RootState): boolean=> state[NameSpace.Register].isAnotherError;

export const selectQuestionnaireError = (state: RootState): QuestionnaireErrorsInterface =>
  state[NameSpace.Register].questionnaireErrors;

export const selectRegistration = createSelector([selectRegisterError, selectIsRegisterError, selectRegisterUser],
  (registerErrors, isRegisterError, registerUser) =>
    ({registerErrors, isRegisterError, registerUser}));

export const selectQuestion = createSelector([selectQuestionnaireError, selectIsQuestionnaireError,
  selectQuestionnaire, selectIsRegisterError],(questionnaireErrors,
  isQuestionError, question, isRegisterError) =>
  ({questionnaireErrors, isQuestionnaireError: isQuestionError || isRegisterError, question}));

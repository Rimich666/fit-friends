import { NameSpace } from '../../settings';
import {RootState} from '../index';
import {RegisterUserInterface} from '../../types/auth/register-user.interface';
import {Role} from '../../enums';
import {RegisterErrorsInterface} from '../../types/auth/register-errors.interface';
import {QuestionnaireErrorsInterface} from '../../types/auth/questionnaire-errors.interface';
import {createSelector} from '@reduxjs/toolkit';
import {QuestionnaireInterface} from '../../types/auth/questionnaire.interface';
import {UserInterface} from '../../types/user.interface';
import {CertificateInterface} from "../../types/certificate.interface";

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

export const selectCurrentUser = (state: RootState): UserInterface => state[NameSpace.Register].currentUser;

export const selectIsUserLoading = (state: RootState): boolean => state[NameSpace.Register].isCurrentUserLoading;

export const selectIsUserLoaded = (state: RootState): boolean => state[NameSpace.Register].isCurrentUserLoaded;

export const selectCertificates = (state: RootState): CertificateInterface[] => state[NameSpace.Register].certificate;

export const selectCertificatesLength = (state: RootState): number =>
  state[NameSpace.Register].certificate.length;

export const selectCertificateIndex = (state: RootState, index: number) => index;

export const makeSelectCertificate = createSelector([selectCertificateIndex, selectCertificates],
  (index, certificates) => certificates[index]);

import {NameSpace} from '../../settings';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {loginAction, registerAction} from '../api-actions/api-actions';
import {RegisterState} from '../../types/states/register-state';
import {QuestionnaireInterface} from '../../types/auth/questionnaire.interface';
import {RegisterUserInterface} from '../../types/auth/register-user.interface';
import {RegisterErrorsInterface} from '../../types/auth/register-errors.interface';
import {QuestionnaireErrorsInterface} from '../../types/auth/questionnaire-errors.interface';
import {parseRegisterErrors} from '../../helpers/parse-register-errors';
import {fillRegisterErrors} from '../../helpers/get-new-register-user';
import {fillQuestionnaireErrors} from '../../helpers/get-new-questionnaire';
import {UserInterface} from '../../types/user.interface';
import {fillUser} from '../../helpers/fill-user';
import {fetchSelf} from '../api-actions/users-actions';
import {CertificateInterface} from '../../types/certificate.interface';
import {addCertificates, deleteCertificates, saveChangeCertificate} from '../api-actions/certificate.actions';

const initialState: RegisterState = {
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
};

export const registerProcess = createSlice({
  name: NameSpace.Register,
  initialState,
  reducers: {
    setRegisterUser: (state, action: PayloadAction<RegisterUserInterface>) => {
      state.registerUser = action.payload;
    },
    setQuestionnaire: (state, action: PayloadAction<QuestionnaireInterface>) => {
      state.questionnaire = action.payload;
    },
    setCertificate: (state, action: PayloadAction<CertificateInterface>) => {
      state.certificate[action.payload.index as number].path = action.payload.path;
      state.certificate[action.payload.index as number].ext = action.payload.ext;
      state.certificate[action.payload.index as number].file = action.payload.file;
    },
    setIsEditCertificate: (state, action: PayloadAction<number>) => {
      state.certificate[action.payload].isEdit = true;
    },
    dropIsEditCertificate: (state, action: PayloadAction<number>) => {
      state.certificate[action.payload].isEdit = false;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(registerAction.pending, (state) => {
        state.questionnaireIsError = false;
        state.registerIsError = false;
        state.isAnotherError = false;
      })
      .addCase(registerAction.fulfilled, (state) => {
        state.questionnaire = undefined as unknown as QuestionnaireInterface;
        state.questionnaireIsError = false;
        state.registerIsError = false;
        state.registerUser = undefined as unknown as RegisterUserInterface;
        state.registerErrors = undefined as unknown as RegisterErrorsInterface;
        state.questionnaireErrors = undefined as unknown as QuestionnaireErrorsInterface;
      })
      .addCase(registerAction.rejected, (state, action) => {
        if (action.error.code === 'Bad Request' && action.error.message) {
          const errors = parseRegisterErrors(action.error.message);
          state.registerErrors = fillRegisterErrors(errors.user);
          state.questionnaireErrors = fillQuestionnaireErrors(errors.questionnaire);
          state.questionnaireIsError = Object.values(state.questionnaireErrors).join('').length > 0;
          state.registerIsError = Object.values(state.registerErrors).join('').length > 0;
          return;
        }
        state.isAnotherError = true;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.currentUser = fillUser(action.payload);
      })
      .addCase(fetchSelf.pending, (state) => {
        state.isCurrentUserLoading = true;
        state.isCurrentUserLoaded = false;
      })
      .addCase(fetchSelf.fulfilled, (state, action) => {
        state.isCurrentUserLoading = false;
        state.isCurrentUserLoaded = true;
        const {certificate, ...user} = fillUser(action.payload);
        state.currentUser = user;
        state.certificate = (certificate as CertificateInterface[]).map((item) =>
          ({...item, ext: `${item.path.substring(item.path.lastIndexOf('.'))}`}));
      })
      .addCase(fetchSelf.rejected, (state, action) => {
        state.isCurrentUserLoading = false;
      })
      .addCase(addCertificates.fulfilled, (state, action) => {
        state.certificate = state.certificate.concat(action.payload);
      })
      .addCase(deleteCertificates.fulfilled, (state, action) => {
        state.certificate = action.payload.map((certificate) =>
          ({...certificate, ext: `${certificate.path.substring(certificate.path.lastIndexOf('.'))}`}));
      })
      .addCase(saveChangeCertificate.fulfilled, (state, action) => {
        state.certificate = action.payload.map((certificate) =>
          ({...certificate, ext: `${certificate.path.substring(certificate.path.lastIndexOf('.'))}`}));
      })
    ;
  }
});

export const {
  setRegisterUser,
  setQuestionnaire,
  setCertificate,
  setIsEditCertificate,
  dropIsEditCertificate
} = registerProcess.actions;

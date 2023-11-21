import {NameSpace} from '../../settings';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {loginAction, registerAction} from '../api-actions/api-actions';
import {RegisterState} from '../../types/register-state';
import {QuestionnaireInterface} from '../../types/questionnaire.interface';
import {RegisterUserInterface} from '../../types/register-user.interface';
import {RegisterErrorsInterface} from '../../types/register-errors.interface';
import {QuestionnaireErrorsInterface} from '../../types/questionnaire-errors.interface';
import {parseRegisterErrors} from '../../helpers/parse-register-errors';
import {fillRegisterErrors} from '../../utils/get-new-register-user';
import {fillQuestionnaireErrors} from '../../utils/get-new-questionnaire';
import {UserInterface} from '../../types/user.interface';
import {fillUser} from '../../helpers/fill-user';
import {fetchSelf} from '../api-actions/users-actions';

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
        state.currentUser = fillUser(action.payload);
      })
      .addCase(fetchSelf.rejected, (state, action) => {
        state.isCurrentUserLoading = false;
      });
  }
});

export const {setRegisterUser, setQuestionnaire} = registerProcess.actions;
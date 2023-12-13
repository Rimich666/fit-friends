import {createAPI} from '../../servises/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {RootState} from '../index';
import {Action, ThunkDispatch} from '@reduxjs/toolkit';
import {fetchSelf} from '../api-actions/users-actions';
import {fakeUserRdo} from '../../mocks/users/fake-user-rdo';
import {fillUser} from '../../helpers/fill-user';
import {makeFakeUsersRdo} from '../../mocks/users/make-fake-users-rdo';
import {ApiRoute} from '../../api-route';
import {RegisterState} from '../../types/states/register-state';
import {makeInitialRegisterState} from '../../mocks/states/make-initial-register-state';
import {
  dropIsEditCertificate,
  registerProcess,
  setCertificate,
  setIsEditCertificate,
  setQuestionnaire,
  setRegisterUser
} from './register-process';
import {fakeRegister} from '../../mocks/register/fake-register';
import {fakeQuestionnaire} from '../../mocks/register/fake-questionnaire';
import {fakeCertificate} from '../../mocks/register/fake-certificate';
import {makeFakeCertificates} from '../../mocks/register/make-fake-certificates';
import {loginAction, registerAction} from '../api-actions/api-actions';
import {parseRegisterErrors} from '../../helpers/parse-register-errors';
import {fillRegisterErrors} from '../../helpers/get-new-register-user';
import {fillQuestionnaireErrors} from '../../helpers/get-new-questionnaire';
import {fakeLoginPayload} from '../../mocks/register/fake-login-payload';
import {CertificateInterface} from '../../types/certificate.interface';
import {addCertificates} from '../api-actions/certificate.actions';
import {registerState} from '../../mocks/states/register-state';
import {redirectToRoute} from '../actions';

describe('Reducer: register', () => {
  let state: RegisterState;

  beforeEach(() => {
    state = makeInitialRegisterState();
  });

  describe('register process test', () => {
    const api = createAPI();
    const mockAPI = new MockAdapter(api);
    it('setRegisterUser test', () => {
      expect(registerProcess.reducer(state, setRegisterUser(fakeRegister)))
        .toEqual({...makeInitialRegisterState(), registerUser: fakeRegister});
    });
    it('setQuestionnaire test', () => {
      expect(registerProcess.reducer(state, setQuestionnaire(fakeQuestionnaire)))
        .toEqual({...makeInitialRegisterState(), questionnaire: fakeQuestionnaire});
    });
    it('setCertificate test', () => {
      state.certificate = makeFakeCertificates();
      const newCertificates = [...state.certificate];
      newCertificates[0].path = fakeCertificate.path;
      newCertificates[0].ext = fakeCertificate.ext;
      newCertificates[0].file = fakeCertificate.file;
      expect(registerProcess.reducer(state, setCertificate(fakeCertificate)))
        .toEqual({...makeInitialRegisterState(), certificate: newCertificates});
    });
    it('setIsEditCertificate test', () => {
      state.certificate = makeFakeCertificates();
      const newCertificates = [...state.certificate];
      newCertificates[0].isEdit = true;
      expect(registerProcess.reducer(state, setIsEditCertificate(0)))
        .toEqual({...makeInitialRegisterState(), certificate: newCertificates});
    });
    it('dropIsEditCertificate test', () => {
      state.certificate = makeFakeCertificates();
      const newCertificates = [...state.certificate];
      newCertificates[1].isEdit = false;
      expect(registerProcess.reducer(state, dropIsEditCertificate(1)))
        .toEqual({...makeInitialRegisterState(), certificate: newCertificates});
    });

    const middlewares = [thunk.withExtraArgument(api)];
    const mockStore = configureMockStore<
      RootState,
      Action<string>,
      ThunkDispatch<RootState, typeof api, Action>
    >(middlewares);

    it('registerAction test', () => {
      expect(registerProcess.reducer(state, {type: registerAction.fulfilled.type}))
        .toEqual({...state});
    });
    it('registerAction error test', () => {
      const message = '["trainingType must be an email", "location must be longer than or equal"]';
      const errors = parseRegisterErrors(message);
      const registerErrors = fillRegisterErrors(errors.user);
      const questionnaireErrors = fillQuestionnaireErrors(errors.questionnaire);
      const newState = {
        ...state,
        registerErrors,
        questionnaireErrors,
        questionnaireIsError: Object.values(questionnaireErrors).join('').length > 0,
        registerIsError: Object.values(registerErrors).join('').length > 0,
      };
      expect(registerProcess.reducer(state, {type: registerAction.rejected.type, error: {message: message, code: 'Bad Request'}}))
        .toEqual(newState);
    });

    it('loginAction test', () => {
      expect(registerProcess.reducer(state, {type: loginAction.fulfilled.type, payload: fakeUserRdo}))
        .toEqual({...state, currentUser: fillUser(fakeUserRdo), isCurrentUserLoading: false, isCurrentUserLoaded: true});
    });

    it('should update currentUser by load', () => {
      const {certificate, ...user} = fillUser(fakeUserRdo);
      const stateCertificate = (certificate as CertificateInterface[]).map((item) =>
        ({...item, ext: `${item.path.substring(item.path.lastIndexOf('.'))}`}));
      const newState = {...state, currentUser: user, certificate: stateCertificate, isCurrentUserLoading: false, isCurrentUserLoaded: true};
      expect(registerProcess.reducer(state, {type: fetchSelf.fulfilled.type, payload: fakeUserRdo}))
        .toEqual(newState);
    });

    it('should set isCurrentUserLoading to false', () => {
      expect(registerProcess.reducer(state, {type: fetchSelf.rejected.type}))
        .toEqual({...state, isCurrentUserLoading: false});
    });

    it('addCertificates test', () => {
      const payload = makeFakeCertificates();
      expect(registerProcess.reducer(state, {type: addCertificates.fulfilled.type, payload}))
        .toEqual({...state, certificate: state.certificate.concat(payload)});
    });

    it('should dispatch Register_User when POST /register', async () => {
      mockAPI
        .onPost(ApiRoute.Register)
        .reply(201);

      const store = mockStore(registerState);

      await store.dispatch(registerAction());

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        registerAction.pending.type,
        redirectToRoute.type,
        registerAction.fulfilled.type
      ]);
    });

    it('should dispatch Login_User when POST /login', async () => {
      mockAPI
        .onPost(ApiRoute.Login)
        .reply(201, fakeLoginPayload);

      Storage.prototype.setItem = jest.fn();
      const store = mockStore();

      await store.dispatch(loginAction({email: 'email', password: 'password'}));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        loginAction.pending.type,
        redirectToRoute.type,
        loginAction.fulfilled.type
      ]);
      expect(Storage.prototype.setItem).toBeCalledTimes(2);
      expect(Storage.prototype.setItem).toBeCalledWith('guest-fit-friends-token', 'accessToken');
      expect(Storage.prototype.setItem).toBeCalledWith('refresh-fit-friends-token', 'refreshToken');
    });

    it('should dispatch Load_Current_Users when GET /users/self', async () => {
      mockAPI
        .onGet(ApiRoute.Self)
        .reply(200, makeFakeUsersRdo());

      const store = mockStore();

      await store.dispatch(fetchSelf());

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchSelf.pending.type,
        fetchSelf.fulfilled.type
      ]);
    });
  });
});

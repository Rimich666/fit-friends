import thunk from 'redux-thunk';
import {configureMockStore, MockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import HistoryRouter from '../../history-route/history-route';
import {render, screen, waitFor} from '@testing-library/react';
import {defaultState} from '../../../mocks/default-state';
import React from 'react';
import UserInfoForm from './user-info.form';
import {UserInfoMode} from '../constants';
import {getEmptyUpdateUser, getEmptyUpdateUserErrors} from '../../../helpers/get-new-update-user';
import userEvent from '@testing-library/user-event';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

const mode = UserInfoMode.edit;
const changeMode = jest.fn();
const onInputName = jest.fn();
const onInputDescription = jest.fn();
const onSelect = jest.fn();
const onCheck = jest.fn();
const onChangeType = jest.fn();
const errors = getEmptyUpdateUserErrors();
const user = getEmptyUpdateUser();

const fakeApp = (store: MockStore) => (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <UserInfoForm {...{mode, changeMode, onChangeType, onCheck, onSelect, onInputDescription, onInputName, errors, user}}/>
    </HistoryRouter>
  </Provider>
);

describe('Component: UserInfoForm', () => {
  it('should render "UserInfoForm"', () => {
    render(fakeApp(mockStore(defaultState)));
    expect(screen.getByTestId(/name/i)).toBeInTheDocument();
    expect(screen.getByTestId(/text-area/i)).toBeInTheDocument();
    expect(screen.getByTestId(/ready-check/i)).toBeInTheDocument();
    expect(screen.getByTestId(/spec-check-btn-yoga/i)).toBeInTheDocument();
    expect(screen.getByTestId(/select-item-male/i)).toBeInTheDocument();
  });
  it('should call a callback with name', async () => {
    render(fakeApp(mockStore(defaultState)));
    userEvent.type(screen.getByTestId('name'), 'user name');
    await waitFor (() => {
      expect(onInputName).toHaveBeenCalledWith('user name');
    });
  });
  it('should call a callback with description', async () => {
    render(fakeApp(mockStore(defaultState)));
    userEvent.type(screen.getByTestId('text-area'), 'description');
    await waitFor (() => {
      expect(onInputDescription).toHaveBeenCalledWith('description');
    });
  });
});

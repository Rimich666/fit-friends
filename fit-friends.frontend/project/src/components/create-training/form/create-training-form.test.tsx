import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {defaultState} from '../../../mocks/states/default-state';
import CreateTrainingForm from './create-training.form';
import {configureMockStore} from '@jedmao/redux-mock-store';
import * as token from '../../../servises/token';
import {Role} from '../../../enums';

const mockStore = configureMockStore();

describe('Component: RegisterForm', () => {
  beforeEach(() => {
    jest.spyOn(token, 'getSelfRole').mockReturnValue(Role.coach);
    jest.spyOn(token, 'getSelfId').mockReturnValue('65329a910b645fb5e70f5f2d');
  });
  it('should render "RegisterForm"', () => {
    render(
      <Provider store={mockStore(defaultState)}>
        <CreateTrainingForm/>
      </Provider>,
    );
    expect(screen.getByTestId('training-name')).toBeInTheDocument();
    expect(screen.getByTestId('training-calories-training')).toBeInTheDocument();
    expect(screen.getByTestId('select-item-yoga')).toBeInTheDocument();
    expect(screen.getByTestId('select-item-beginner')).toBeInTheDocument();
    expect(screen.getByTestId('price')).toBeInTheDocument();
    expect(screen.getByTestId('select-item-10 - 30')).toBeInTheDocument();
  });
});

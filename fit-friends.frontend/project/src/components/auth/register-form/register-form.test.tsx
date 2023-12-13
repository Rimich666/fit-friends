import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import RegisterForm from './register-form';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {defaultState} from '../../../mocks/states/default-state';

const mockStore = configureMockStore();

describe('Component: RegisterForm', () => {
  it('should render "RegisterForm"', () => {
    render(
      <Provider store={mockStore(defaultState)}>
        <RegisterForm/>
      </Provider>,
    );
    expect(screen.getByTestId('register-email')).toBeInTheDocument();
    expect(screen.getByTestId('register-password')).toBeInTheDocument();
    expect(screen.getByTestId('name')).toBeInTheDocument();
    expect(screen.getByTestId('birthday')).toBeInTheDocument();
    expect(screen.getByText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByText(/Пароль/i)).toBeInTheDocument();
    expect(screen.getByText(/Дата рождения/i)).toBeInTheDocument();
    expect(screen.getByText(/Продолжить/i)).toBeInTheDocument();
  });
});

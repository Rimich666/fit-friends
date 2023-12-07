import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import LoginForm from './login-form';
import {configureMockStore} from '@jedmao/redux-mock-store';

const mockStore = configureMockStore();

describe('Component: LoginForm', () => {
  it('should render "LoginForm"', () => {
    render(
      <Provider store={mockStore({})}>
        <LoginForm />
      </Provider>,
    );

    expect(screen.getByTestId('login-email')).toBeInTheDocument();
    expect(screen.getByTestId('login-password')).toBeInTheDocument();
    expect(screen.getByText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByText(/Пароль/i)).toBeInTheDocument();
    expect(screen.getByText(/Продолжить/i)).toBeInTheDocument();
  });
});

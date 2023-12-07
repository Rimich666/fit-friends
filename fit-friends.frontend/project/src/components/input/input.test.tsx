import {render, screen, waitFor} from '@testing-library/react';
import Input from './input';
import {Inputs} from './inputs';
import userEvent from '@testing-library/user-event';

describe('Component: LoginFormInput', () => {
  it('should render "Email input"', async () => {
    const onInputHandle = jest.fn();
    render(
      <Input {...{...Inputs.loginEmail, callback: onInputHandle, errorMessage: ''}}/>
    );
    expect(screen.getByText(/E-mail/i)).toBeInTheDocument();
    userEvent.type(screen.getByTestId('login-email'), 'keks@mail.ru');
    await waitFor (() => {
      expect(screen.getByDisplayValue(/keks@mail.ru/i)).toBeInTheDocument();
    });


  });
  it('should render "Password input"', async () => {
    const onInputHandle = jest.fn();
    render(
      <Input {...{...Inputs.loginPassword, callback: onInputHandle, errorMessage: ''}}/>
    );
    expect(screen.getByText(/Пароль/i)).toBeInTheDocument();

    userEvent.type(screen.getByTestId('login-password'), 'kjyf');
    await waitFor (() => {
      expect(screen.getByDisplayValue(/kjyf/i)).toBeInTheDocument();
    });
  });
});

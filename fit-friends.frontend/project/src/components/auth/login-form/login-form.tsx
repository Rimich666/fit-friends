import Input from '../../input/input';
import {Inputs} from '../../input/inputs';
import React, {useState} from 'react';
import {useAppDispatch} from '../../../hooks';
import {loginAction} from '../../../store/api-actions/api-actions';
import {getNewLogin} from '../../../helpers/get-new-login';

export default function LoginForm(): JSX.Element {
  const [login] = useState(getNewLogin());
  const dispatch = useAppDispatch();

  const onInputPassword = (text: string) => {
    login.password = text;
  };
  const onInputEmail = (text: string) => {
    login.email = text;
  };

  const submitHandle = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(loginAction(login));
  };

  return (
    <form method="get" onSubmit={submitHandle}>
      <div className="sign-in">
        <Input {...{...Inputs.loginEmail, callback: onInputEmail, errorMessage: ''}}/>
        <Input {...{...Inputs.loginPassword, callback: onInputPassword, errorMessage: ''}}/>
        <button className="btn sign-in__button" type="submit">Продолжить</button>
      </div>
    </form>
  );
}

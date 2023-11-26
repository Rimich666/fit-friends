import Logo from '../components/logo/logo';
import {LoginMode} from '../settings';
import LoginForm from '../components/auth/login-form/login-form';
import RegisterForm from '../components/auth/register-form/register-form';
import {useAppSelector} from '../hooks';
import {selectIsAnotherError} from '../store/register-process/register-selectors';
import {useNavigate} from 'react-router-dom';

import {AppRoute} from '../app-route';
import {Helmet} from 'react-helmet';

type AuthProps = {
  mode: LoginMode;
}

export default function Auth({mode}: AuthProps): JSX.Element {
  const isError = useAppSelector(selectIsAnotherError);
  const navigate = useNavigate();
  if (isError) {
    navigate(AppRoute.Intro);
  }
  return (
    <>
      <Helmet>
        <title>{`${mode === LoginMode.Login ? 'Войти' : 'Регистрация'} — FitFriends`}</title>
      </Helmet>
      <main>
        <Logo/>
        <div className={`popup-form popup-form--sign-${mode === LoginMode.Login ? 'in' : 'up'}`}>
          <div className="popup-form__wrapper">
            <div className="popup-form__content">
              <div className="popup-form__title-wrapper">
                <h1 className="popup-form__title">{mode === LoginMode.Login ? 'Вход' : 'Регистрация'}</h1>
              </div>
              <div className="popup-form__form">
                {mode === LoginMode.Login ? <LoginForm/> : <RegisterForm/>}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

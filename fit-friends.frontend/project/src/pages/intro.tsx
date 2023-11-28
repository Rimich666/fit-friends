import {NavLink, useNavigate} from 'react-router-dom';


import {AppRoute} from '../app-route';
import {dropRefresh} from '../servises/refresh-token';
import {dropToken} from '../servises/token';

export default function Intro(): JSX.Element {
  const navigate = useNavigate();

  function handleRegisterClick() {
    navigate(AppRoute.Register);
  }

  const handleLogoClick = () => {
    dropRefresh();
    dropToken();
  };

  return (
    <main>
      <div className="intro">
        <div className="intro__background">
          <picture>
            <source type="image/webp" srcSet="/img/content/sitemap/background.webp, /img/content/sitemap/background@2x.webp 2x"/>
            <img
              src="/img/content/sitemap/background.jpg"
              srcSet="/img/content/sitemap/background@2x.jpg 2x"
              width="1440" height="1024" alt="Фон с бегущей девушкой"
            />
          </picture>
        </div>
        <div className="intro__wrapper">
          <svg className="intro__icon" width="60" height="60" aria-hidden="true" onClick={handleLogoClick}>
            <use xlinkHref="#icon-logotype"></use>
          </svg>
          <div className="intro__title-logo">
            <picture>
              <source type="image/webp" srcSet="/img/content/sitemap/title-logo.webp, /img/content/sitemap/title-logo@2x.webp 2x"/>
              <img
                src="/img/content/sitemap/title-logo.png"
                srcSet="/img/content/sitemap/title-logo@2x.png 2x"
                width="934" height="455" alt="Логотип Fit Friends"
              />
            </picture>
          </div>
          <div className="intro__buttons">
            <button className="btn intro__button" type="button" onClick={handleRegisterClick}>Регистрация</button>
            <p className="intro__text">Есть аккаунт? <NavLink className="intro__link" to={`${AppRoute.Login}`}>Вход</NavLink>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

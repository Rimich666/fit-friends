import {useNavigate} from 'react-router-dom';
import {AppRoute} from '../../settings';

export default function NotFoundMain(): JSX.Element {
  const navigate = useNavigate();

  const toProductsHandle = () => {
    navigate(AppRoute.Intro);
  };

  return (
    <main className="page-content">
      <div className="container">
        <section className="error">
          <h1 className="error__title">404</h1><span className="error__subtitle">Страница не найдена.</span>
          <p className="error__text"> Возможно, страница была удалена или<br></br>её вовсе не существовало.</p>
          <button
            className="button button__error button--small button--black-border"
            onClick={toProductsHandle}
          >Продолжить покупки
          </button>
        </section>
      </div>
    </main>
  );
}

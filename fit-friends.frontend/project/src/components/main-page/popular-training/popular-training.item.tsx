import {Link} from 'react-router-dom';
import {AppRoute} from '../../../app-route';

export type PopularTrainingItemProps = {
  id: number;
  src: string;
  price: number;
  name: string;
  type: string;
  caloriesCount: number;
  rating: number;
  description: string;
}

export default function PopularTrainingItem({id, ...props}: PopularTrainingItemProps): JSX.Element {
  return (
    <li className="popular-trainings__item">
      <div className="thumbnail-training">
        <div className="thumbnail-training__inner">
          <div className="thumbnail-training__image">
            <picture>
              <img src={props.src} width="330" height="190" alt=""/>
            </picture>
          </div>
          <p className="thumbnail-training__price">
            <span className="thumbnail-training__price-value">{props.price}</span>
            <span>₽</span>
          </p>
          <h3 className="thumbnail-training__title">{props.name}</h3>
          <div className="thumbnail-training__info">
            <ul className="thumbnail-training__hashtags-list">
              <li className="thumbnail-training__hashtags-item">
                <div className="hashtag thumbnail-training__hashtag">
                  <span>{`#${props.type}`}</span>
                </div>
              </li>
              <li className="thumbnail-training__hashtags-item">
                <div className="hashtag thumbnail-training__hashtag">
                  <span>{`#${props.caloriesCount}ккал`}</span>
                </div>
              </li>
            </ul>
            <div className="thumbnail-training__rate">
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-star"></use>
              </svg>
              <span className="thumbnail-training__rate-value">{props.rating}</span>
            </div>
          </div>
          <div className="thumbnail-training__text-wrapper">
            <p className="thumbnail-training__text">{props.description}</p>
          </div>
          <div className="thumbnail-training__button-wrapper">
            <Link className="btn btn--small thumbnail-training__button-catalog"
              to={AppRoute.SportsmanTraining}
            >Подробнее
            </Link>
            <a className="btn btn--small btn--outlined thumbnail-training__button-catalog" href="#">Отзывы</a>
          </div>
        </div>
      </div>
    </li>
  );
}

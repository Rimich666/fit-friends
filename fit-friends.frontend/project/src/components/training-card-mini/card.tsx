import ResultCard from './result-card';
import {ComponentVariant, miniCardLink, TrainingCardClass} from '../../component-variant';
import {Link} from 'react-router-dom';

export type CardProps = {
  id: number;
  src: string;
  price: number;
  type: string;
  name: string;
  caloriesCount: number;
  description: string;
  rating: number;
  count?: number;
  total?: number;
  variant: ComponentVariant;
}
export default function Card(props: CardProps): JSX.Element {
  return (
    <li className={`${TrainingCardClass[props.variant as keyof typeof TrainingCardClass]}`}>
      <div className="thumbnail-training">
        <div className="thumbnail-training__inner">
          <div className="thumbnail-training__image">
            <picture>
              <img src={props.src} width="330" height="190" alt=""/>
            </picture>
          </div>
          <p className="thumbnail-training__price">{props.price === 0 ? 'Бесплатно' : (
            <>
              <span className="thumbnail-training__price-value">{props.price}</span>
              <span>₽</span>
            </>
          )}
          </p>
          {(props.variant === ComponentVariant.myOrders || props.variant === ComponentVariant.purchases) ?
            <h2 className="thumbnail-training__title">{props.name}</h2> :
            <h3 className="thumbnail-training__title">{props.name}</h3>}
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
          {props.variant === ComponentVariant.myOrders ?
            <a className="btn-flat btn-flat--underlined thumbnail-training__button-orders" href="#">
              <svg width="18" height="18" aria-hidden="true">
                <use xlinkHref="#icon-info"></use>
              </svg>
              <span>Подробнее</span>
            </a> :
            <div className="thumbnail-training__button-wrapper">
              <Link className="btn btn--small thumbnail-training__button-catalog"
                to={`${miniCardLink[props.variant as keyof typeof miniCardLink]}/${props.id}`}
              >Подробнее
              </Link>
              <a className="btn btn--small btn--outlined thumbnail-training__button-catalog" href="#">Отзывы</a>
            </div>}
        </div>
        {(props.variant === ComponentVariant.myOrders && props.total && props.count ) &&
          <div className="thumbnail-training__total-info">
            <ResultCard title={'Куплено тренировок'} icon={'#icon-chart'} value={props.count}/>
            <ResultCard title={'Общая сумма'} icon={'#icon-wallet'} value={props.total}/>
          </div>}
      </div>
    </li>
  );
}

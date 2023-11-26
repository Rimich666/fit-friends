import {Link} from 'react-router-dom';
import {AppRoute} from '../../../app-route';

export type SpecialForYouItemProps = {
  src: string;
  type: string;
  id: number;
}

export default function SpecialForYouItem(props: SpecialForYouItemProps): JSX.Element {
  return (
    <li className="special-for-you__item">
      <div className="thumbnail-preview">
        <div className="thumbnail-preview__image">
          <picture>
            <img src={props.src} width={452} height={191} alt=""/>
          </picture>
        </div>
        <div className="thumbnail-preview__inner">
          <h3 className="thumbnail-preview__title">{`${props.type}`}</h3>
          <div className="thumbnail-preview__button-wrapper">
            <Link className="btn btn--small thumbnail-preview__button"
              to={`${AppRoute.SportsmanTraining}/${props.id}`}
            >Подробнее
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}

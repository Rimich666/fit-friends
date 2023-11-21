import {ComponentVariant} from '../../component-variant';
import {BtnClass, LiClass} from '../training-catalog/variances';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../app-route';
import {Role} from '../../enums';

export type UserCardProps = {
  id: string;
  src: string;
  name: string;
  location: string;
  specialization: string[];
  dark: boolean;
  variant: ComponentVariant;
  role: Role;
}

export default function UserCard({id, ...props}: UserCardProps): JSX.Element {
  const liClass = LiClass[props.variant as keyof typeof LiClass];
  const btnClass = BtnClass[props.variant as keyof typeof BtnClass];

  return (
    <li className={liClass}>
      <div className={`thumbnail-user thumbnail-user--role-user ${props.dark ? 'thumbnail-user--dark' : ''}`}>
        <div className="thumbnail-user__image">
          <picture>
            <img
              src={props.src} width="82"
              height="82" alt=""
            />
          </picture>
        </div>
        <div className="thumbnail-user__header">
          <h3 className="thumbnail-user__name">{props.name}</h3>
          <div className="thumbnail-user__location">
            <svg width="14" height="16" aria-hidden="true">
              <use xlinkHref="#icon-location"></use>
            </svg>
            <address className="thumbnail-user__location-address">{props.location}</address>
          </div>
        </div>
        <ul className="thumbnail-user__hashtags-list">
          {props.specialization.map((spec) => (
            <li className="thumbnail-user__hashtags-item" key={spec}>
              <div className="hashtag thumbnail-user__hashtag"><span>{`#${spec}`}</span></div>
            </li>
          ))}
        </ul>
        <Link className={`btn ${btnClass} ${props.dark ? 'btn--dark-bg' : ''} btn--medium thumbnail-user__button`}
          to={props.role === Role.coach ? `${AppRoute.CoachCard}/${id}` : `${AppRoute.UserCard}/${id}`}
        >Подробнее
        </Link>
      </div>
    </li>
  );
}

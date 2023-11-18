import {TrainingType, TrainingTypeText, UserLocation} from '../../enums';
import {THEME} from '../../settings';

type FriendItemProps = {
  name: string;
  avatar: string;
  location: UserLocation;
  trainingTypes: TrainingType[];
  isReady: boolean;
  isRequest: boolean;
}

export default function FriendItem(props: FriendItemProps): JSX.Element {
  return (
    <li className="friends-list__item">
      <div className="thumbnail-friend">
        <div className={`thumbnail-friend__info thumbnail-friend__info--theme-${THEME}`}>
          <div className="thumbnail-friend__image-status">
            <div className="thumbnail-friend__image">
              <picture>
                <img src={props.avatar} width="78" height="78" alt=""/>
              </picture>
            </div>
          </div>
          <div className="thumbnail-friend__header">
            <h2 className="thumbnail-friend__name">{props.name}</h2>
            <div className="thumbnail-friend__location">
              <svg width="14" height="16" aria-hidden="true">
                <use xlinkHref="#icon-location"></use>
              </svg>
              <address className="thumbnail-friend__location-address">{props.location}</address>
            </div>
          </div>
          <ul className="thumbnail-friend__training-types-list">
            {props.trainingTypes.map((type) => (
              <li key={type}>
                <div className="hashtag thumbnail-friend__hashtag">
                  <span>{`#${TrainingTypeText[type].toLowerCase()}`}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="thumbnail-friend__activity-bar">
            <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-ready">
              {props.isReady && <span>Готов к&nbsp;тренировке</span>}
              {!props.isReady && <span>Не&nbsp;готов к&nbsp;тренировке</span>}
            </div>
          </div>
        </div>
        {props.isRequest && (
          <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user">
            <p className="thumbnail-friend__request-text">Запрос на&nbsp;персональную тренировку</p>
            <div className="thumbnail-friend__button-wrapper">
              <button className="btn btn--medium btn--dark-bg thumbnail-friend__button" type="button">Принять</button>
              <button className="btn btn--medium btn--outlined btn--dark-bg thumbnail-friend__button" type="button">Отклонить</button>
            </div>
          </div>
        )}
      </div>
    </li>
  );
}

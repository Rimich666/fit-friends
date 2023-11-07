export type LookForCompanyItemProps = {
  id: string;
  src: string;
  name: string;
  location: string;
  specialisation: string[];
}

export default function LookForCompanyItem({id, ...props}: LookForCompanyItemProps): JSX.Element {
  return (
    <li className="look-for-company__item">
      <div className="thumbnail-user thumbnail-user--role-user thumbnail-user--dark">
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
          {props.specialisation.map((spec) => (
            <li className="thumbnail-user__hashtags-item" key={spec}>
              <div className="hashtag thumbnail-user__hashtag"><span>{`#${spec}`}</span></div>
            </li>
          ))}
        </ul>
        <a className="btn btn--outlined btn--dark-bg btn--medium thumbnail-user__button" href="#">Подробнее</a>
      </div>
    </li>
  );
}

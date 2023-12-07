import {Link} from 'react-router-dom';
import {PersonalAccountLinkInterFace} from './personal-account-link.interface';

export default function PersonalAccountLink({href, text, icon, id}: PersonalAccountLinkInterFace): JSX.Element {
  return (
    <Link className="thumbnail-link thumbnail-link--theme-light" to={href} data-testid={id}>
      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
        <svg width="30" height="26" aria-hidden="true">
          <use xlinkHref={icon}/>
        </svg>
      </div>
      <span className="thumbnail-link__text">{text}</span>
    </Link>
  );
}

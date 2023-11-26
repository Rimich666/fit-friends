import {HeaderLink, HeaderPoint, HeaderTitle} from './nav';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../app-route';

type NavItemProps = {
  point: HeaderPoint;
  isActive: boolean;
}

export default function NavItem({point, isActive}: NavItemProps): JSX.Element {
  return (
    <li className="main-nav__item">
      <Link className={`main-nav__link ${isActive ? 'is-active' : ''}`} to={HeaderLink[point]} aria-label={HeaderTitle[point]}>
        <svg width="18" height="18" aria-hidden="true">
          <use xlinkHref={`#icon-${point}`}/>
        </svg>
      </Link>
    </li>
  );
}

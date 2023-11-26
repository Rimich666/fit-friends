import {Link} from 'react-router-dom';
import {deleteNotification} from '../../store/api-actions/notification-action';
import {useState} from 'react';
import dayjs from 'dayjs';
import {useAppDispatch} from '../../hooks';

type NotificationItemProps = {
  text: string;
  date: Date;
  id: string;
}

export default function NotificationItem({text, date, id}: NotificationItemProps): JSX.Element {
  const [isActivate, setIsActivate] = useState(true);
  const dispatch = useAppDispatch();
  const clickHandle = () => {
    setIsActivate(false);
    dispatch(deleteNotification(id));
  };
  return (
    <li className="main-nav__subitem" onClick={clickHandle}>
      <Link className={`notification ${isActivate ? 'is-active' : ''}`} to={'#'}>
        <p className="notification__text">{text}</p>
        <time className="notification__time" dateTime={dayjs(date).format('YYYY-MM-DD hh:mm')}>
          {dayjs(date).format('DD MMMM, hh:mm')}
        </time>
      </Link>
    </li>
  );
}

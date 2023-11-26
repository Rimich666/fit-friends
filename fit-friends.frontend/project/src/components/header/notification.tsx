import useFetchNotification from '../../hooks/useFetchNotification';
import {useAppSelector} from '../../hooks';
import {selectNotifications} from '../../store/notification-process/notification.selectors';
import NotificationItem from './notification-item';

export default function Notification(): JSX.Element {
  useFetchNotification();
  const notifications = useAppSelector(selectNotifications);
  return (
    <div className="main-nav__dropdown">
      <p className="main-nav__label">Оповещения</p>
      <ul className="main-nav__sublist">
        {notifications.map((note) =>
          <NotificationItem text={note.text} date={new Date(note.createDate)} id={note.id} key={note.id}/>)}
      </ul>
    </div>
  );
}

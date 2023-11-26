import {NotificationInterface} from '../notification.interface';


export type NotificationState = {
  isNotificationsLoaded: boolean;
  notifications: NotificationInterface[];
  isNotificationsLoading: boolean;
};

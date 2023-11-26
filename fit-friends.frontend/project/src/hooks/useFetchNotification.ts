import {useAppDispatch} from './index';
import {useEffect, useState} from 'react';
import {fetchNotifications} from '../store/api-actions/notification-action';

export default function useFetchNotification() {
  const dispatch = useAppDispatch();
  const [fetch] = useState({first: true});
  useEffect(() => {
    if (fetch.first){
      dispatch(fetchNotifications());
      fetch.first = false;
    }
  });
}

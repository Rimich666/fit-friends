import {useEffect, useState} from 'react';
import {useAppDispatch} from './index';
import {fetchUser} from '../store/api-actions/users-actions';

export default function useFetchUser(id: string) {
  const [fetch] = useState({first: true});
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (fetch.first) {
      dispatch(fetchUser(id));
      fetch.first = false;
    }
  });
}

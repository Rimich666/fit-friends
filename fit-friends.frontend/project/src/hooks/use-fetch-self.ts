import {getSelfId} from '../servises/token';
import {useEffect, useState} from 'react';
import {useAppDispatch} from './index';
import {fetchUser} from '../store/api-actions/api-actions';

export default function useFetchSelf() {
  const [fetch] = useState({first: true});
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (fetch.first) {
      dispatch(fetchUser(getSelfId()));
      fetch.first = false;
    }
  });
}

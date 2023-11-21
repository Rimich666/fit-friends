import {useEffect, useState} from 'react';
import {useAppDispatch} from './index';

import {fetchSelf} from '../store/api-actions/users-actions';

export default function useFetchSelf() {
  const [fetch] = useState({first: true});
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (fetch.first) {
      dispatch(fetchSelf());
      fetch.first = false;
    }
  });
}

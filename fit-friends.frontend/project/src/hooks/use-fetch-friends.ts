import {useAppDispatch} from './index';
import {useEffect, useState} from 'react';
import {fetchFriends} from '../store/api-actions/friends-actions';

export default function useFetchFriends() {
  const dispatch = useAppDispatch();
  const [fetch] = useState({first: true});
  useEffect(() => {
    if (fetch.first){
      dispatch(fetchFriends());
      fetch.first = false;
    }
  });
}

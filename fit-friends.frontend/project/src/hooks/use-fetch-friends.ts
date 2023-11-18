import {useAppDispatch} from './index';
import {useEffect, useState} from 'react';
import {loadFriends} from '../store/user-process/user-process';
import {FriendInterface} from '../types/friend.interface';

export default function useFetchFriends(friends: FriendInterface[]) {
  const dispatch = useAppDispatch();
  const [fetch] = useState({first: true});
  useEffect(() => {
    if (fetch.first){
      dispatch(loadFriends([...friends]));
      fetch.first = false;
    }
  });
}

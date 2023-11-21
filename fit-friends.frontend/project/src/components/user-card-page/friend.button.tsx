import React from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {selectIsFriend} from '../../store/user-process/user.selectors';
import {createFriend, deleteFriend} from '../../store/api-actions/friends-actions';

type FriendButtonProps = {
  tail: string;
  id: string;
}

export default function FriendButton({tail, id}: FriendButtonProps): JSX.Element {
  const isFriend = useAppSelector(selectIsFriend);
  const dispatch = useAppDispatch();

  const friendClickHAndle = () => {
    dispatch(isFriend ? deleteFriend(id) : createFriend(id));
  };

  return (
    <button className={`btn user-card${tail}__btn`} type="button" onClick={friendClickHAndle}>
      {isFriend ? 'Удалить из друзей' : 'Добавить в друзья'}
    </button>
  );
}

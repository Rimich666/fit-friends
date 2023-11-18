import {useAppSelector} from '../../hooks';
import {selectFriends} from '../../store/user-process/user.selectors';
import FriendItem from './friend-item';


export default function FriendList(): JSX.Element {
  const friends = useAppSelector(selectFriends);
  return (
    <ul className="friends-list__list">
      {friends.map((friend) => {
        const {id, ...props} = friend;
        return ( <FriendItem {...props} key={id}/> );
      })}
    </ul>
  );
}

import Header from '../components/header/header';
import MyFriendsMain from '../components/my-friends/my-friends.main';
import {Role} from '../enums';

export default function CoachFriends(): JSX.Element {
  return (
    <>
      <Header/>
      <MyFriendsMain role={Role.coach}/>
    </>
  );
}

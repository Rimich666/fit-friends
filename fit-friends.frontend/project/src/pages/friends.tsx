import Header from '../components/header/header';
import MyFriendsMain from '../components/my-friends/my-friends.main';
import {Role} from '../enums';
import {setBackRoute} from '../utils/back-route';
import {AppRoute} from '../app-route';
import {Helmet} from 'react-helmet';

type FriendsProps = {
  role: Role;
}

export default function Friends({role}: FriendsProps): JSX.Element {
  setBackRoute(AppRoute.Friends);
  return (
    <>
      <Helmet>
        <title>Список друзей — FitFriends</title>
      </Helmet>
      <Header/>
      <MyFriendsMain/>
    </>
  );
}

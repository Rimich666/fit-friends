import Header from '../components/header/header';
import UserCardMain from '../components/user-card-page/user-card.main';
import {Role} from '../enums';
import useFetchUser from '../hooks/use-fetch-user';
import {useParams} from 'react-router-dom';

export default function SportsmanCard(): JSX.Element {
  const id = useParams().userId;
  useFetchUser(id as string);
  return (
    <>
      <Header/>
      <UserCardMain role={Role.sportsman}/>
    </>
  );
}

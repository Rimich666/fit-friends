import Header from '../components/header/header';
import UserCardMain from '../components/user-card-page/user-card.main';
import {Role} from '../enums';
import {useParams} from 'react-router-dom';
import useFetchForCoachCard from '../hooks/use-fetch-for-coach-card';
import useFetchUser from '../hooks/use-fetch-user';
import useCheckSubscribe from '../hooks/use-check-subscribe';

export default function CoachCard(): JSX.Element {
  const id = useParams().userId;
  useFetchForCoachCard(id as string);
  useFetchUser(id as string);
  useCheckSubscribe(id as string);
  return (
    <>
      <Header/>
      <UserCardMain role={Role.coach}/>
    </>
  );
}

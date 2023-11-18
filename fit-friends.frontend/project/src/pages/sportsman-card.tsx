import Header from '../components/header/header';
import UserCardMain from '../components/user-card-page/user-card.main';
import {Role} from '../enums';

export default function SportsmanCard(): JSX.Element {
  return (
    <>
      <Header/>
      <UserCardMain role={Role.sportsman}/>
    </>
  );
}

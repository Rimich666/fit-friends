import Header from '../components/header/header';
import UserInfoSection from '../components/personal-account/user-info-section/user-info.section';
import {Role} from '../enums';
import PersonalAccountUser from '../components/personal-account/user/personal-account-user';
import PersonalAccountCoach from '../components/personal-account/coach/personal-account-coach';
import {useAppSelector} from '../hooks';
import {selectCurrentUser, selectIsUserLoaded, selectIsUserLoading} from '../store/register-process/register-selectors';
import {SpinnerCircular} from 'spinners-react';
import NotFoundMain from '../components/main-not-found/not-found.main';
import useFetchSelf from '../hooks/use-fetch-self';

type PersonalAccountProps = {
  role: Role;
}

export default function PersonalAccount({role}: PersonalAccountProps): JSX.Element {
  useFetchSelf();

  const isLoading = useAppSelector(selectIsUserLoading);
  const isLoaded = useAppSelector(selectIsUserLoaded);
  const user = useAppSelector(selectCurrentUser);
  if (isLoading){
    return (<SpinnerCircular/>);
  }

  if (!isLoaded){
    return (<NotFoundMain/>);
  }
  console.log(user.certificate);
  return (
    <>
      <Header/>
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Личный кабинет</h1>
              <UserInfoSection user={user}/>
              <div className="inner-page__content">
                {role === Role.sportsman && <PersonalAccountUser/>}
                {role === Role.coach && <PersonalAccountCoach certificates={user.certificate as string[]}/>}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
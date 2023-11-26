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
import {setBackRoute} from '../utils/back-route';
import {AppRoute} from '../app-route';
import {Helmet} from 'react-helmet';

type PersonalAccountProps = {
  role: Role;
}

export default function PersonalAccount({role}: PersonalAccountProps): JSX.Element {
  useFetchSelf();
  setBackRoute(AppRoute.Office);

  const isLoaded = useAppSelector(selectIsUserLoaded);
  const isLoading = useAppSelector(selectIsUserLoading);
  const user = useAppSelector(selectCurrentUser);
  if (isLoading){
    return (<SpinnerCircular/>);
  }

  if (!isLoaded){
    return (<NotFoundMain name={'личный кабинет'}/>);
  }
  return (
    <>
      <Helmet>
        <title>Личный кабинет — FitFriends</title>
      </Helmet>
      <Header/>
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Личный кабинет</h1>
              <UserInfoSection user={user}/>
              <div className="inner-page__content">
                {role === Role.sportsman && <PersonalAccountUser caloriesCount={user.daysCalories as number}/>}
                {role === Role.coach && <PersonalAccountCoach/>}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

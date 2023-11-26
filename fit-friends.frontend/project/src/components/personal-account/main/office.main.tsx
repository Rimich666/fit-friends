import UserInfoSection from '../user-info-section/user-info.section';
import {Role} from '../../../enums';
import PersonalAccountUser from '../user/personal-account-user';
import PersonalAccountCoach from '../coach/personal-account-coach';
import {useAppSelector} from '../../../hooks';
import {
  selectCurrentUser,
  selectIsUserLoaded,
  selectIsUserLoading
} from '../../../store/register-process/register-selectors';
import {SpinnerCircular} from 'spinners-react';
import NotFoundMain from '../../main-not-found/not-found.main';

type OfficeMainProps = {
  role: Role;
}
export default function OfficeMain({role}: OfficeMainProps): JSX.Element {
  const isLoading = useAppSelector(selectIsUserLoading);
  const isLoaded = useAppSelector(selectIsUserLoaded);
  const user = useAppSelector(selectCurrentUser);
  if (isLoading){
    return (<SpinnerCircular/>);
  }

  if (!isLoaded){
    return (<NotFoundMain/>);
  }

  return (
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
  );
}

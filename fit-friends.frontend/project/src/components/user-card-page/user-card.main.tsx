import {Role} from '../../enums';
import UserCardCard from './user-card.card';
import {useAppSelector} from '../../hooks';
import {selectUserCard} from '../../store/user-process/user.selectors';
import {SpinnerCircular} from 'spinners-react';
import NotFoundMain from '../main-not-found/not-found.main';
import CoachCardTrainings from './coach-card/coach-card-trainings';
import React, {useState} from 'react';
import Popup, {PopupType} from '../../popups/popup';
import {useNavigate} from 'react-router-dom';
import {getBackRoute} from '../../utils/back-route';

type UserCardMainProps = {
  role: Role;
}

export default function UserCardMain({role}: UserCardMainProps): JSX.Element {
  const [viewMap, setViewMap] = useState(false);
  const tail = role === Role.coach ? '-coach' : '';
  const {user, isLoaded, isLoading} = useAppSelector(selectUserCard);
  const navigate = useNavigate();
  const backRoute = getBackRoute();
  if (isLoading){
    return (<SpinnerCircular/>);
  }

  if (!isLoaded){
    return (<NotFoundMain name={'UserCardMain'}/>);
  }

  const onPlaceClick = () => {
    setViewMap(true);
  };

  const onCloseMap = () => {
    setViewMap(false);
  };

  const backClickHandle = () => {
    navigate(backRoute);
  };

  return (
    <main>
      <div className="inner-page inner-page--no-sidebar">
        <div className="container">
          <div className="inner-page__wrapper">
            <button className="btn-flat inner-page__back" type="button" onClick={backClickHandle}>
              <svg width="14" height="10" aria-hidden="true">
                <use xlinkHref="#arrow-left"/>
              </svg>
              <span>Назад</span>
            </button>
            <div className="inner-page__content">
              <section className={`user-card${tail}`}>
                <h1 className="visually-hidden">{`Карточка пользователя${role === Role.coach ? ' роль тренер' : ''}`}</h1>
                <div className={`user-card${tail}__wrapper`}>
                  {role === Role.coach &&
                    <div className={'user-card-coach__card'}>
                      <UserCardCard {...{...user, onPlaceClick: onPlaceClick}}/>
                    </div>}
                  {role === Role.sportsman &&
                    <UserCardCard {...{...user, onPlaceClick: onPlaceClick}}/>}
                  {role === Role.coach && <CoachCardTrainings isReady={user.isReady}/>}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      {viewMap && <Popup popup={PopupType.map} title={user.name} location={user.location} onClose={onCloseMap}/>}
    </main>
  );
}

import FriendList from './friend-list';
import useFetchFriends from '../../hooks/use-fetch-friends';
import {useNavigate} from 'react-router-dom';
import {useAppSelector} from '../../hooks';
import {selectBackRoute} from '../../store/back-process/back.selectors';

export default function MyFriendsMain(): JSX.Element {
  const navigate = useNavigate();
  const backRoute = useAppSelector(selectBackRoute);
  const clickBackHandle = () => {
    navigate(backRoute);
  };
  useFetchFriends();
  return (
    <main>
      <section className="friends-list">
        <div className="container">
          <div className="friends-list__wrapper">
            <button className="btn-flat friends-list__back" type="button" onClick={clickBackHandle}>
              <svg width="14" height="10" aria-hidden="true">
                <use xlinkHref="#arrow-left"></use>
              </svg>
              <span>Назад</span>
            </button>
            <div className="friends-list__title-wrapper">
              <h1 className="friends-list__title">Мои друзья</h1>
            </div>
            <FriendList/>
            <div className="show-more friends-list__show-more">
              <button className="btn show-more__button show-more__button--more" type="button">Показать еще</button>
              <button className="btn show-more__button show-more__button--to-top" type="button">Вернуться в начало</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

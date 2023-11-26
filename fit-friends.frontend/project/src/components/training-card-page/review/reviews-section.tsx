import ReviewList from './review-list';
import {useAppSelector} from '../../../hooks';
import {selectBalance} from '../../../store/balance-process/balance.selectors';
import {useNavigate} from 'react-router-dom';
import {getBackRoute} from '../../../utils/back-route';

type ReviewsSectionProps = {
  onClickFeedback: () => void;
}

export default function ReviewsSection({onClickFeedback}: ReviewsSectionProps): JSX.Element {
  const count = useAppSelector(selectBalance);
  const navigate = useNavigate();
  const backRoute = getBackRoute();
  const clickBackHandle = () => {
    navigate(backRoute);
  };
  return (
    <aside className="reviews-side-bar">
      <button className="btn-flat btn-flat--underlined reviews-side-bar__back" type="button" onClick={clickBackHandle}>
        <svg width="14" height="10" aria-hidden="true">
          <use xlinkHref="#arrow-left"/>
        </svg>
        <span>Назад</span>
      </button>
      <h2 className="reviews-side-bar__title">Отзывы</h2>
      <ReviewList/>
      <button className="btn btn--medium reviews-side-bar__button" type="button" disabled={count === 0}
        onClick={onClickFeedback}
      >Оставить отзыв
      </button>
    </aside>
  );
}

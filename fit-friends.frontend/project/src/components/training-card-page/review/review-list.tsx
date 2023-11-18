import {useAppSelector} from '../../../hooks';
import {selectReviews} from '../../../store/review-process/reviews.selectors';
import ReviewItem from './review-item';

export default function ReviewList(): JSX.Element {
  const reviews = useAppSelector(selectReviews);
  return (
    <ul className="reviews-side-bar__list">
      {reviews.map((review) => {
        const {id, ...props} = review;
        return <ReviewItem {...props} key={id}/>;
      })}
    </ul>
  );
}

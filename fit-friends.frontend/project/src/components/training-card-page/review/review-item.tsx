type ReviewItemProps = {
  name: string;
  avatar: string;
  rating: number;
  comment: string;
}

export default function ReviewItem({name, rating, comment, avatar}: ReviewItemProps): JSX.Element {
  return (
    <li className="reviews-side-bar__item">
      <div className="review">
        <div className="review__user-info">
          <div className="review__user-photo">
            <picture>
              <img src={avatar} width="64" height="64" alt="Изображение пользователя"/>
            </picture>
          </div><span className="review__user-name">{name}</span>
          <div className="review__rating">
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-star"></use>
            </svg>
            <span>{rating}</span>
          </div>
        </div>
        <p className="review__comment">{comment}</p>
      </div>
    </li>
  );
}

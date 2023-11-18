import ReviewsSection from './review/reviews-section';
import TrainingInfoSection from './training-info/training-info.section';
import {Role} from '../../enums';
import {useState} from 'react';
import Popup, {PopupType} from '../../popups/popup';

type TrainingCardMainProps = {
  role: Role;
  id: number;
}

export default function TrainingCardMain(props: TrainingCardMainProps): JSX.Element {
  const [viewBuy, setViewBuy] = useState(false);
  const [viewFeedback, setViewFeedback] = useState(false);

  const onBuyClick = () => {
    setViewBuy(true);
  };

  const onCloseBuy = () => {
    setViewBuy(false);
  };

  const onCloseFeedback = () => {
    setViewFeedback(false);
  };

  return (
    <main>
      <section className="inner-page">
        <div className="container">
          <div className="inner-page__wrapper">
            <h1 className="visually-hidden">Карточка тренировки</h1>
            <ReviewsSection/>
            <TrainingInfoSection role={props.role} onClickBuy={onBuyClick}/>
          </div>
        </div>
      </section>
      {viewBuy && <Popup popup={PopupType.buy} title={'Купить тренировку'} onClose={onCloseBuy}/>}
      {viewFeedback && <Popup popup={PopupType.feedback} title={'Оставить отзыв'} onClose={onCloseFeedback}/>}
    </main>
  );
}

import {useState} from 'react';
import RateItem from './rate.item';
import TextArea from '../components/text-area/text-area';
import {useAppDispatch, useAppSelector} from '../hooks';
import {selectFeedbackProps} from '../store/popup-process/popup.selectors';
import {createFeedback} from "../store/api-actions/feedback-actions";

type FeedbackPopupProps = {
  onClose: () => void;
}

export default function FeedbackPopup({onClose}: FeedbackPopupProps): JSX.Element {
  const [rating, setRating] = useState(0);
  const [comment] = useState({text: ''});

  const id = useAppSelector(selectFeedbackProps).trainingId;
  const dispatch = useAppDispatch();

  const changeRate = (value: number, isCheck: boolean) => {
    setRating(isCheck ? value : 0);
  };

  const onInput = (text: string) => {
    comment.text = text;
  };

  const clickHandle = () => {
    dispatch(createFeedback({rating: rating, text: comment.text, trainingId: id}));
    onClose();
  };

  return (
    <div className="popup__content popup__content--feedback">
      <h3 className="popup__feedback-title">Оцените тренировку</h3>
      <ul className="popup__rate-list">
        {[1, 2, 3, 4, 5].map((rate) => <RateItem value={rate} isCheck={rate === rating} callback={changeRate} key={rate}/>)}
      </ul>
      <div className="popup__feedback">
        <h3 className="popup__feedback-title popup__feedback-title--text">Поделитесь своими впечатлениями о тренировке</h3>
        <div className="popup__feedback-textarea">
          <TextArea callback={onInput} errorMessage={''} class={''}/>
        </div>
      </div>
      <div className="popup__button">
        <button className="btn" type="button" onClick={clickHandle}>Продолжить</button>
      </div>
    </div>
  );
}

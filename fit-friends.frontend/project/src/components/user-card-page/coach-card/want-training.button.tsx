import {useAppDispatch, useAppSelector} from '../../../hooks';
import {selectIsFriend, selectUserId} from '../../../store/user-process/user.selectors';
import {createQuestion} from '../../../store/api-actions/join-actions';

export default function WantTrainingButton(): JSX.Element {
  const isFriend = useAppSelector(selectIsFriend);
  const id = useAppSelector(selectUserId);
  const dispatch = useAppDispatch();

  const clickHandle = () => {
    dispatch(createQuestion(id));
  };
  return (
    <button className="btn user-card-coach__btn-training" type="button" disabled={!isFriend} onClick={clickHandle}>
      Хочу персональную тренировку
    </button>
  );
}


import {useAppDispatch, useAppSelector} from '../../../hooks';
import {selectIsSubscribe, selectUserId} from '../../../store/user-process/user.selectors';
import {createSubscribe, deleteSubscribe} from '../../../store/api-actions/subscribe-actions';

export default function AgreementCheck(): JSX.Element {
  const isSubscribe = useAppSelector(selectIsSubscribe);
  const id = useAppSelector(selectUserId);
  const dispatch = useAppDispatch();
  const clickHandle = () => {
    dispatch(isSubscribe ? deleteSubscribe(id) : createSubscribe(id));
  };
  return (
    <input type="checkbox" value="user-agreement-1" name="user-agreement" checked={isSubscribe} onClick={clickHandle}/>
  );
}

import {useAppDispatch, useAppSelector} from './index';
import {useEffect, useState} from 'react';
import {fetchTrainingsForYou} from '../store/api-actions/api-actions';
import {selectUser} from '../store/user-process/user.selectors';

const LIMIT = 9;

export default function useFetchForYou() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [fetch] = useState({first: true});
  useEffect(() => {
    if (fetch.first){
      dispatch(fetchTrainingsForYou(`limit=${LIMIT}&trainingType=${user.trainingType[0]}`));
      fetch.first = false;
    }
  });
}

import {useAppDispatch} from './index';
import {useEffect, useState} from 'react';
import {fetchTrainingsCoachCard} from '../store/api-actions/api-actions';

const LIMIT = 9;

export default function useFetchForCoachCard(id: string) {
  const dispatch = useAppDispatch();
  const [fetch] = useState({first: true});
  useEffect(() => {
    if (fetch.first){
      dispatch(fetchTrainingsCoachCard(`limit=${LIMIT}&coachId=${id}`));
      fetch.first = false;
    }
  });
}

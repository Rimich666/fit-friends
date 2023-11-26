import {useAppDispatch} from './index';
import {useEffect, useState} from 'react';
import {fetchTrainingsForYou} from '../store/api-actions/api-actions';

const LIMIT = 9;

export default function useFetchForYou() {
  const dispatch = useAppDispatch();
  const [fetch] = useState({first: true});
  useEffect(() => {
    if (fetch.first){
      dispatch(fetchTrainingsForYou(LIMIT));
      fetch.first = false;
    }
  });
}

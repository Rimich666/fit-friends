import {useAppDispatch} from './index';
import {useEffect, useState} from 'react';
import {fetchTrainingsPopular} from '../store/api-actions/api-actions';

const LIMIT = 9;

export default function useFetchPopular() {
  const dispatch = useAppDispatch();
  const [fetch] = useState({first: true});
  useEffect(() => {
    if (fetch.first){
      dispatch(fetchTrainingsPopular(`limit=${LIMIT}&rating=5`));
      fetch.first = false;
    }
  });
}

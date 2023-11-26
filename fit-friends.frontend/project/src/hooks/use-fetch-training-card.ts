import {useAppDispatch} from './index';
import {useEffect, useState} from 'react';
import {fetchTrainingCard} from '../store/api-actions/api-actions';
import {setIsTrainingCardLoading} from '../store/training-process/training.process';

export default function useFetchTrainingCard(id: number) {
  const dispatch = useAppDispatch();
  const [fetch] = useState({first: true});
  dispatch(setIsTrainingCardLoading(true));
  useEffect(() => {
    if (fetch.first){
      dispatch(fetchTrainingCard(id));
      fetch.first = false;
    }
  });
}

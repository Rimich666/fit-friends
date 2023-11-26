import {useAppDispatch} from './index';
import {useEffect, useState} from 'react';
import {fetchCoachTrainings} from '../store/api-actions/api-actions';
import {CoachTrainingsFilterInterface} from '../types/filters/coach-trainings-filter.interface';
import {makeCoachTrainingFilter} from '../helpers/make-coach-training-filter';

export default function useFetchCoachTrainings(filter: CoachTrainingsFilterInterface) {
  const dispatch = useAppDispatch();
  const [fetch] = useState({first: true});
  useEffect(() => {
    if (fetch.first){
      dispatch(fetchCoachTrainings(makeCoachTrainingFilter(filter)));
      fetch.first = false;
    }
  });
}

import {useAppDispatch} from './index';
import {useEffect, useState} from 'react';

import {fetchFeedbacks} from '../store/api-actions/feedback-actions';

export default function useFetchFeedbacks(id: number) {
  const dispatch = useAppDispatch();
  const [fetch] = useState({first: true});
  useEffect(() => {
    if (fetch.first){
      dispatch(fetchFeedbacks(id));
      fetch.first = false;
    }
  });
}

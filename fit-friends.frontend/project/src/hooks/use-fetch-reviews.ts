import {useAppDispatch} from './index';
import {useEffect, useState} from 'react';
import {ReviewInterface} from '../types/review.interface';
import {loadReviews} from '../store/review-process/review.process';

export default function useFetchReviews(reviews: ReviewInterface[]) {
  const dispatch = useAppDispatch();
  const [fetch] = useState({first: true});
  useEffect(() => {
    if (fetch.first){
      dispatch(loadReviews([...reviews]));
      fetch.first = false;
    }
  });
}

import {useAppDispatch} from './index';
import {useEffect, useState} from 'react';
import {fetchSpecialOffers} from '../store/api-actions/api-actions';

const LIMIT = 3;

export default function useFetchSpecialOffers() {
  const dispatch = useAppDispatch();
  const [fetch] = useState({first: true});
  useEffect(() => {
    if (fetch.first){
      dispatch(fetchSpecialOffers(LIMIT));
      fetch.first = false;
    }
  });
}



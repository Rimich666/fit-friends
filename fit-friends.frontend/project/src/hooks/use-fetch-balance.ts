import {useAppDispatch} from './index';
import {useEffect, useState} from 'react';
import {fetchBalance} from '../store/api-actions/api-actions';

export default function useFetchBalance(id: number) {
  const dispatch = useAppDispatch();
  const [fetch] = useState({first: true});
  useEffect(() => {
    if (fetch.first){
      dispatch(fetchBalance(id));
      fetch.first = false;
    }
  });
}

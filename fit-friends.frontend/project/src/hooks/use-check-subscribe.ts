import {useEffect, useState} from 'react';
import {useAppDispatch} from './index';
import {checkSubscribe} from '../store/api-actions/subscribe-actions';

export default function useCheckSubscribe(id: string) {
  const [fetch] = useState({first: true});
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (fetch.first) {
      dispatch(checkSubscribe(id));
      fetch.first = false;
    }
  });
}

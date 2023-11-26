import {useAppDispatch} from './index';
import {useEffect, useState} from 'react';
import {fetchOrders} from '../store/api-actions/order.action';

export default function useFetchOrders(options: string) {
  const dispatch = useAppDispatch();
  const [fetch] = useState({first: true});
  console.log('useFetchOrders', options);
  useEffect(() => {
    if (fetch.first){
      dispatch(fetchOrders(options));
      fetch.first = false;
    }
  });
}

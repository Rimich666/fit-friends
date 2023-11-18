import {useAppDispatch} from './index';
import {useEffect, useState} from 'react';
import {MyOrderInterface} from '../types/card-interface';
import {loadOrders} from '../store/orders-process/order.process';

export default function useFetchOrders(orders: MyOrderInterface[]) {
  const dispatch = useAppDispatch();
  const [fetch] = useState({first: true});
  useEffect(() => {
    if (fetch.first){
      dispatch(loadOrders([...orders]));
      fetch.first = false;
    }
  });
}

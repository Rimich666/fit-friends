import {useAppDispatch} from './index';
import {useEffect, useState} from 'react';
import {fetchPurchases} from '../store/api-actions/api-actions';
import {makePurchasesFilters} from '../helpers/make-purchases-filters';

export default function useFetchPurchases(page: number, isActive: boolean) {
  const dispatch = useAppDispatch();
  const [fetch] = useState({first: true});
  useEffect(() => {
    if (fetch.first){
      dispatch(fetchPurchases(makePurchasesFilters(page, isActive)));
      fetch.first = false;
    }
  });
}

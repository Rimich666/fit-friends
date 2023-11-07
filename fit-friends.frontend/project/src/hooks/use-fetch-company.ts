import {useAppDispatch} from './index';
import {useEffect, useState} from 'react';
import {fetchCompany} from '../store/api-actions/api-actions';

const LIMIT = 8;

export default function useFetchCompany() {
  const dispatch = useAppDispatch();
  const [fetch] = useState({first: true});
  useEffect(() => {
    if (fetch.first){
      dispatch(fetchCompany(`limit=${LIMIT}`));
      fetch.first = false;
    }
  });
}

import {useAppDispatch} from './index';
import {useEffect, useState} from 'react';
import {fetchUsers} from '../store/api-actions/users-actions';
import {CatalogUsersFilterInterface} from '../types/catalog-users-filter.interface';
import {makeUsersFilter} from '../helpers/make-users-filter';

export default function useFetchUsers(filter: CatalogUsersFilterInterface) {
  const dispatch = useAppDispatch();
  const [fetch] = useState({first: true});
  useEffect(() => {
    if (fetch.first){
      dispatch(fetchUsers(makeUsersFilter(filter)));
      fetch.first = false;
    }
  });
}

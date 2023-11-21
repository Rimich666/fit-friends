import {useAppDispatch} from './index';
import {useEffect, useState} from 'react';
import {fetchCatalogTrainings} from '../store/api-actions/api-actions';
import {CatalogTrainingsFilterInterface} from '../types/catalog-trainings-filter.interface';
import {makeCatalogTrainingsFilter} from '../helpers/make-catalog-trainings-filter';

export default function useFetchCatalogTrainings(filter: CatalogTrainingsFilterInterface) {
  const dispatch = useAppDispatch();
  const [fetch] = useState({first: true});
  useEffect(() => {
    if (fetch.first){
      dispatch(fetchCatalogTrainings(makeCatalogTrainingsFilter(filter)));
      fetch.first = false;
    }
  });
}

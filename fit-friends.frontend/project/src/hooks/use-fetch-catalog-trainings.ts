import {useAppDispatch} from './index';
import {useEffect, useState} from 'react';
import {fetchCatalogTrainings} from '../store/api-actions/api-actions';
import {makeCoachTrainingFilter} from '../helpers/make-coach-training-filter';
import {CatalogTrainingsFilterInterface} from '../types/catalog-trainings-filter.interface';

export default function useFetchCatalogTrainings(filter: CatalogTrainingsFilterInterface) {
  const dispatch = useAppDispatch();
  const [fetch] = useState({first: true});
  useEffect(() => {
    if (fetch.first){
      dispatch(fetchCatalogTrainings(makeCoachTrainingFilter(filter)));
      fetch.first = false;
    }
  });
}

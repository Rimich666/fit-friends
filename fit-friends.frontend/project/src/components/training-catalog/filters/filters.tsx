import {FormClass, getCheckType, RangeTypes} from '../variances';
import RangeBlock from './range-block/range-block';
import {useState} from 'react';
import {initCheckBox} from './init-check-box';
import {ComponentVariant} from '../../../component-variant';
import FilterCheckBlock from './filter-check-block';
import LevelRadioBlock from '../../level-radio-block';
import {Level, Order, Role} from '../../../enums';
import {RangeConstraint} from '../../../types/training-state';
import {useAppDispatch} from '../../../hooks';
import {fetchCatalogTrainings, fetchCoachTrainings} from '../../../store/api-actions/api-actions';
import {CoachTrainingsFilterInterface} from '../../../types/coach-trainings-filter.interface';
import {makeCoachTrainingFilter} from '../../../helpers/make-coach-training-filter';
import {TrainingSort} from './sort-block/sort-button';
import SortBlock from './sort-block/sort-block';
import {makeCatalogTrainingsFilter} from '../../../helpers/make-catalog-trainings-filter';
import {CatalogTrainingsFilterInterface} from '../../../types/catalog-trainings-filter.interface';

type FiltersProps = {
  variant: ComponentVariant;
}

export default function Filters({variant}: FiltersProps):JSX.Element {
  const [check] = useState(initCheckBox(variant));
  const formClass = FormClass[variant as keyof typeof FormClass];
  const [coachFilter] = useState<CoachTrainingsFilterInterface>({page: 1});
  const dispatch = useAppDispatch();
  const [sortFilter] = useState({sort: undefined as unknown as TrainingSort});

  console.log('Filters', check);
  const queryCards = () => {
    switch (variant) {
      case ComponentVariant.myTraining: {
        dispatch(fetchCoachTrainings(makeCoachTrainingFilter({...coachFilter,
          time: Object.keys(check.time).filter((time) => check.time[time] === true)})));
        break;
      }
      case ComponentVariant.trainingCatalog: {
        const filter: CatalogTrainingsFilterInterface = {...coachFilter,
          trainingType: Object.keys(check.type).filter((type) =>
            check.type[type] === true)};
        if (sortFilter.sort) {
          if (sortFilter.sort === TrainingSort.freebie) {
            filter.priceMin = 0;
            filter.priceMax = 0;
          } else {
            filter.sort = 'price';
            filter.order = sortFilter.sort === TrainingSort.cheaper ? Order.asc : Order.desc;
          }
        }
        console.log('Filters', filter);
        dispatch(fetchCatalogTrainings(makeCatalogTrainingsFilter(filter)));
        break;
      }
    }
  };

  const onChangeRange = (type: string, range: RangeConstraint) => {
    Object.keys(range).forEach((key) => {
      (coachFilter[`${type}${key[0].toUpperCase()}${key.substring(1)}` as keyof typeof coachFilter] as number) =
        range[key as keyof typeof range];
    });

    queryCards();
  };

  const onCheck = (type: string, value: {[p: string]: boolean}) => {
    check[type as keyof typeof check] = value;
    queryCards();
  };

  const onSelectLevel = (value: Level) => {
    queryCards();
  };

  const onChangeSort = (value: string) => {
    sortFilter.sort = value === '' ? undefined as unknown as TrainingSort : TrainingSort[value as keyof typeof TrainingSort];
    queryCards();
  };

  return (
    <form className={`${formClass}__form`}>
      {(variant === ComponentVariant.myTraining || variant === ComponentVariant.trainingCatalog) &&
        Object.keys(RangeTypes).map((key) => (
          <RangeBlock
            callback={onChangeRange}
            formClass={formClass}
            type={RangeTypes[key as keyof typeof RangeTypes]}
            key={key}
          />))}

      {getCheckType(variant).map((type) => (
        <FilterCheckBlock type={type} formClass={formClass} checked={check[type as keyof typeof check]}
          callback={onCheck} variant={variant} key={type}
        />
      ))}

      {variant === ComponentVariant.trainingCatalog &&
        <div className="gym-catalog-form__block gym-catalog-form__block--sort">
          <h4 className="gym-catalog-form__title gym-catalog-form__title--sort">Сортировка</h4>
          <SortBlock callback={onChangeSort}/>
        </div>}
      {variant === ComponentVariant.userCatalog && (
        <>
          <LevelRadioBlock callback={onSelectLevel} value={Level.beginner} role={Role.sportsman}
            variant={ComponentVariant.userCatalog}
          />
          <div className="user-catalog-form__block">
            <h3 className="user-catalog-form__title user-catalog-form__title--sort">Сортировка</h3>
            <div className="btn-radio-sort">
              <label>
                <input type="radio" name="sort" checked/>
                <span className="btn-radio-sort__label">Тренеры</span>
              </label>
              <label>
                <input type="radio" name="sort"/>
                <span className="btn-radio-sort__label">Пользователи</span>
              </label>
            </div>
          </div>
        </>
      )}
    </form>
  );
}

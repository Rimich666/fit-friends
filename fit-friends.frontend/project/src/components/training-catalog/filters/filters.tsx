import {FormClass, getCheckType, RangeTypes} from '../variances';
import RangeBlock from './range-block/range-block';
import {useState} from 'react';
import {initCheckBox} from './init-check-box';
import {ComponentVariant} from '../../../component-variant';
import FilterCheckBlock from './filter-check-block';
import LevelRadioBlock from '../../level-radio-block';
import {Level, Role} from '../../../enums';
import {RangeConstraint} from '../../../types/training-state';
import {useAppDispatch} from '../../../hooks';
import {fetchCatalogTrainings, fetchCoachTrainings} from '../../../store/api-actions/api-actions';
import {CoachTrainingsFilterInterface} from '../../../types/coach-trainings-filter.interface';
import {makeCoachTrainingFilter} from '../../../helpers/make-coach-training-filter';
import {TrainingSort} from './sort-block/sort-button';
import SortBlock from './sort-block/sort-block';
import {
  makeCatalogTrainingsFilter,
  prepareCatalogTrainingsFilter
} from '../../../helpers/make-catalog-trainings-filter';
import RoleBlock from './role-block/role-block';
import {RoleSort} from './role-block/role.button';
import {fetchUsers} from '../../../store/api-actions/users-actions';
import {makeUsersFilter, prepareUsersFilter} from '../../../helpers/make-users-filter';

type FiltersProps = {
  variant: ComponentVariant;
}

export default function Filters({variant}: FiltersProps):JSX.Element {
  const [check] = useState(initCheckBox(variant));
  const formClass = FormClass[variant as keyof typeof FormClass];
  const [coachFilter] = useState<CoachTrainingsFilterInterface>({page: 1});
  const dispatch = useAppDispatch();
  const [sortFilter] = useState({sort: undefined as unknown as TrainingSort});
  const [usersFilter] = useState({
    role: undefined as unknown as RoleSort,
    level: undefined as unknown as Level
  });

  console.log('Filters', check);
  const queryCards = () => {
    switch (variant) {
      case ComponentVariant.myTraining: {
        dispatch(fetchCoachTrainings(makeCoachTrainingFilter({...coachFilter,
          time: Object.keys(check.time).filter((time) => check.time[time] === true)})));
        break;
      }
      case ComponentVariant.trainingCatalog: {
        dispatch(fetchCatalogTrainings(makeCatalogTrainingsFilter(
          prepareCatalogTrainingsFilter({check, sortFilter, coachFilter}))));
        break;
      }
      case ComponentVariant.userCatalog: {
        dispatch(fetchUsers(makeUsersFilter(prepareUsersFilter({check, usersFilter, coachFilter}))));
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
    usersFilter.level = value;
    queryCards();
  };

  const onChangeSort = (value: string) => {
    sortFilter.sort = value === '' ? undefined as unknown as TrainingSort : TrainingSort[value as keyof typeof TrainingSort];
    queryCards();
  };

  const onChangeRole = (value: string) => {
    usersFilter.role = value === '' ? undefined as unknown as RoleSort : RoleSort[value as keyof typeof RoleSort];
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
          <LevelRadioBlock callback={onSelectLevel} value={undefined as unknown as Level} role={Role.sportsman}
            variant={ComponentVariant.userCatalog}
          />
          <RoleBlock callback={onChangeRole}/>

        </>
      )}
    </form>
  );
}

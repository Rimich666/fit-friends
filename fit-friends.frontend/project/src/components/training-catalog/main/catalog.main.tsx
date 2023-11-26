import Filters from '../filters/filters';
import CardList from '../card-list/card.list';
import {backRoute, FilterTitle, FormClass, H1} from '../variances';
import ButtonBlock from '../buttons-block/button-block';
import {ComponentVariant} from '../../../component-variant';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import {initCheckBox} from '../filters/init-check-box';
import {CoachTrainingsFilterInterface} from '../../../types/filters/coach-trainings-filter.interface';
import {useAppDispatch} from '../../../hooks';
import {TrainingSort} from '../filters/sort-block/sort-button';
import {RoleSort} from '../filters/role-block/role.button';
import {Level} from '../../../enums';
import {fetchCatalogTrainings, fetchCoachTrainings} from '../../../store/api-actions/api-actions';
import {makeCoachTrainingFilter} from '../../../helpers/make-coach-training-filter';
import {
  makeCatalogTrainingsFilter,
  prepareCatalogTrainingsFilter
} from '../../../helpers/make-catalog-trainings-filter';
import {fetchUsers} from '../../../store/api-actions/users-actions';
import {makeUsersFilter, prepareUsersFilter} from '../../../helpers/make-users-filter';
import {RangeConstraint} from '../../../types/states/training-state';

type CatalogTrainingsMainProps = {
  variant: ComponentVariant;
}

export default function CatalogMain({variant}: CatalogTrainingsMainProps): JSX.Element {
  const navigate = useNavigate();
  const [check] = useState(initCheckBox(variant));
  const formClass = FormClass[variant as keyof typeof FormClass];
  const [coachFilter] = useState<CoachTrainingsFilterInterface>({page: 1});
  const dispatch = useAppDispatch();
  const [sortFilter] = useState({sort: undefined as unknown as TrainingSort});
  const [usersFilter] = useState({
    role: undefined as unknown as RoleSort,
    level: undefined as unknown as Level
  });

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

  const onChangePage = (page: number) => {
    coachFilter.page = page;
    queryCards();
  };

  const callbacks = {onChangeRange, onChangeRole, onCheck, onSelectLevel, onChangeSort};

  const clickBackHandle = () => {
    navigate(backRoute[variant as keyof typeof backRoute]);
  };
  return (
    <main>
      <section className="inner-page">
        <div className="container">
          <div className="inner-page__wrapper">
            <h1 className="visually-hidden">{H1[variant as keyof typeof H1]}</h1>
            <div className={formClass}>
              <h2 className="visually-hidden">{FilterTitle[variant as keyof typeof FilterTitle]}</h2>
              <div className={`${formClass}__wrapper`}>
                <button className={`btn-flat btn-flat--underlined ${formClass}__btnback`} type="button"
                  onClick={clickBackHandle}
                >
                  <svg width="14" height="10" aria-hidden="true">
                    <use xlinkHref="#arrow-left"/>
                  </svg>
                  <span>Назад</span>
                </button>
                <h3 className={`${formClass}__title`}>фильтры</h3>
                <Filters {...{...callbacks, variant}}/>
              </div>
            </div>
            {variant === ComponentVariant.myTraining &&
              <div className="inner-page__content">
                <div className="my-trainings">
                  <CardList variant={variant}/>
                  <ButtonBlock page={coachFilter.page} onPageClick={onChangePage}/>
                </div>
              </div>}
            {variant === ComponentVariant.trainingCatalog &&
              <div className="training-catalog">
                <CardList variant={variant}/>
                <ButtonBlock page={coachFilter.page} onPageClick={onChangePage}/>
              </div>}
            {variant === ComponentVariant.userCatalog &&
              <div className="inner-page__content">
                <div className="users-catalog">
                  <CardList variant={variant}/>
                  <ButtonBlock page={coachFilter.page} onPageClick={onChangePage}/>
                </div>
              </div>}
          </div>
        </div>
      </section>
    </main>
  );
}

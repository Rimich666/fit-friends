import CardList from '../training-catalog/card-list/card.list';
import {ComponentVariant} from '../../component-variant';
import ButtonBlock from '../training-catalog/buttons-block/button-block';
import ReadyCheck from '../ready-check/ready.check';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {AppRoute} from '../../app-route';
import useFetchPurchases from '../../hooks/use-fetch-purchases';
import {useAppDispatch} from '../../hooks';
import {fetchPurchases} from '../../store/api-actions/api-actions';
import {makePurchasesFilters} from '../../helpers/make-purchases-filters';

export default function PurchasesMain(): JSX.Element {
  const [options] = useState({isActive: false, page: 1});
  const navigate = useNavigate();
  useFetchPurchases(options.page, options.isActive);
  const dispatch = useAppDispatch();

  const queryCards = () => {
    dispatch(fetchPurchases(makePurchasesFilters(options.page, options.isActive)));
  };

  const onCheck = (value: boolean) => {
    options.isActive = value;
    queryCards();
  };

  const onChangePage = (page: number) => {
    options.page = page;
    queryCards();
  };

  const clickBackHandle = () => {
    navigate(AppRoute.Sportsman);
  };

  return (
    <main>
      <section className="my-purchases">
        <div className="container">
          <div className="my-purchases__wrapper">
            <button className="btn-flat my-purchases__back" type="button" onClick={clickBackHandle}>
              <svg width="14" height="10" aria-hidden="true">
                <use xlinkHref="#arrow-left"/>
              </svg>
              <span>Назад</span>
            </button>
            <div className="my-purchases__title-wrapper">
              <h1 className="my-purchases__title">Мои покупки</h1>
              <div className="my-purchases__controls">
                <ReadyCheck callback={onCheck} isChecked={options.isActive} variant={ComponentVariant.purchases}
                  isDisabled={false}
                />
              </div>
            </div>
            <CardList variant={ComponentVariant.purchases}/>
            <ButtonBlock page={options.page} onPageClick={onChangePage}/>
          </div>
        </div>
      </section>
    </main>
  );
}

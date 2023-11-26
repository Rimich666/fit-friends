import MyOrderList from './my-order-list';
import {Order} from '../../enums';
import {useState} from 'react';
import {orderRevers} from '../../utils/order-revers';
import {DefaultOptions, makeOrdersFilters, OrderSortFieldsEnum} from '../../helpers/make-orders-filters';
import {useAppDispatch} from '../../hooks';
import {fetchOrders} from '../../store/api-actions/order.action';
import {useNavigate} from 'react-router-dom';
import {AppRoute} from '../../app-route';
import ButtonBlock from '../training-catalog/buttons-block/button-block';

export default function MyOrdersMain(): JSX.Element {
  const [sort, setSort] = useState(DefaultOptions.sort);
  const [orders, setOrders] =
    useState({count: DefaultOptions.order, total: DefaultOptions.order});
  const [options] = useState(DefaultOptions);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onChange = () => {
    dispatch(fetchOrders(makeOrdersFilters({...options, sort: sort, order: orders[sort]})));
  };

  const sortCountHandle = () => {
    sort === OrderSortFieldsEnum.count ? setOrders({...orders, count: orderRevers(orders.count)}) :
      setSort(OrderSortFieldsEnum.count);
    onChange();
  };

  const sortTotalHandle = () => {
    sort === OrderSortFieldsEnum.total ? setOrders({...orders, total: orderRevers(orders.total)}) :
      setSort(OrderSortFieldsEnum.total);
    onChange();
  };

  const onChangePage = (page: number) => {
    options.page = page;
    onChange();
  };

  const clickBackHandle = () => {
    navigate(AppRoute.Coach);
  };

  return (
    <main>
      <section className="my-orders">
        <div className="container">
          <div className="my-orders__wrapper">
            <button className="btn-flat btn-flat--underlined my-orders__back" type="button" onClick={clickBackHandle}>
              <svg width="14" height="10" aria-hidden="true">
                <use xlinkHref="#arrow-left"/>
              </svg>
              <span>Назад</span>
            </button>
            <div className="my-orders__title-wrapper">
              <h1 className="my-orders__title">Мои заказы</h1>
              <div className="sort-for">
                <p>Сортировать по:</p>
                <div className="sort-for__btn-container">
                  <button className="btn-filter-sort" type="button" onClick={sortTotalHandle}>
                    <span>Сумме</span>
                    <svg width="16" height="10" aria-hidden="true">
                      {orders.total === Order.desc && <use xlinkHref="#icon-sort-up"/>}
                      {orders.total === Order.asc && <use xlinkHref="#icon-sort-down"/>}
                    </svg>
                  </button>
                  <button className="btn-filter-sort" type="button" onClick={sortCountHandle}>
                    <span>Количеству</span>
                    <svg width="16" height="10" aria-hidden="true">
                      {orders.count === Order.desc && <use xlinkHref="#icon-sort-up"/>}
                      {orders.count === Order.asc && <use xlinkHref="#icon-sort-down"/>}
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <MyOrderList/>
            <ButtonBlock page={options.page} onPageClick={onChangePage}/>
          </div>
        </div>
      </section>
    </main>
  );
}

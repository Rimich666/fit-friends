import MyOrderList from './my-order-list';
import useFetchFriends from "../../hooks/use-fetch-friends";
import useFetchOrders from "../../hooks/use-fetch-orders";
import {ordersData} from './my-orders';

export default function MyOrdersMain(): JSX.Element {
  useFetchOrders(ordersData);
  return (
    <main>
      <section className="my-orders">
        <div className="container">
          <div className="my-orders__wrapper">
            <button className="btn-flat btn-flat--underlined my-orders__back" type="button">
              <svg width="14" height="10" aria-hidden="true">
                <use xlinkHref="#arrow-left"></use>
              </svg><span>Назад</span>
            </button>
            <div className="my-orders__title-wrapper">
              <h1 className="my-orders__title">Мои заказы</h1>
              <div className="sort-for">
                <p>Сортировать по:</p>
                <div className="sort-for__btn-container">
                  <button className="btn-filter-sort" type="button"><span>Сумме</span>
                    <svg width="16" height="10" aria-hidden="true">
                      <use xlinkHref="#icon-sort-up"></use>
                    </svg>
                  </button>
                  <button className="btn-filter-sort" type="button"><span>Количеству</span>
                    <svg width="16" height="10" aria-hidden="true">
                      <use xlinkHref="#icon-sort-down"></use>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <MyOrderList/>
            <div className="show-more my-orders__show-more">
              <button className="btn show-more__button show-more__button--more" type="button">Показать еще</button>
              <button className="btn show-more__button show-more__button--to-top" type="button">Вернуться в начало</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

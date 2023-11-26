import Header from '../components/header/header';
import MyOrdersMain from '../components/my-order/my-orders.main';
import useFetchOrders from '../hooks/use-fetch-orders';
import {DefaultOptions, makeOrdersFilters} from '../helpers/make-orders-filters';
import {Helmet} from 'react-helmet';

export default function MyOrders(): JSX.Element {
  useFetchOrders(makeOrdersFilters(DefaultOptions));
  return (
    <>
      <Helmet>
        <title>Мои заказы — FitFriends</title>
      </Helmet>
      <Header/>
      <MyOrdersMain/>
    </>
  );
}

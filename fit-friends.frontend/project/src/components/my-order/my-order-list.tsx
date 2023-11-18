import {useAppSelector} from '../../hooks';
import {selectOrders} from '../../store/orders-process/orders-selectors';
import Card from '../training-card-mini/card';

import {ComponentVariant} from '../../component-variant';

export default function MyOrderList(): JSX.Element {
  const orders = useAppSelector(selectOrders);
  return (
    <ul className="my-orders__list">
      {orders.map((order) => <Card {...{...order, variant: ComponentVariant.myOrders}} key={order.id}/>)}
    </ul>
  );
}

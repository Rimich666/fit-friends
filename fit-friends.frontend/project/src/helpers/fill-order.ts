import {OrderRdo} from '../types/order-rdo';
import {TrainingType} from '../enums';
import {MyOrderInterface} from '../types/card-interface';

export const fillOrder = (order: OrderRdo): MyOrderInterface => ({
  id: order.trainingId,
  src: order.backgroundPath,
  price: order.price,
  name: order.name,
  type: order.trainingType as TrainingType,
  caloriesCount: order.caloriesCount,
  description: order.description,
  rating: order.rating,
  count: order.count,
  total: order.total,
});

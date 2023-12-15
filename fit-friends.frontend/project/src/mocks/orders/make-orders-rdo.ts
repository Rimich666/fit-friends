import {Gender, Level, TrainingTime} from '../../enums';
import {MyOrderInterface} from '../../types/card-interface';
import {ordersData} from './my-orders';

const fakeOrderRdo = {
  level: Level.professional,
  trainingTime: TrainingTime['10 - 30'],
  gender: Gender.female,
  videoId: 'videoId',
  coachId: 'coachId',
  spec: false,
  createDate: new Date(),
  trainingId: 25
};

const fillOrderRdo = (order: MyOrderInterface) => ({
  orderId: order.id,
  backgroundPath: order.src,
  price: order.price,
  name: order.name,
  trainingType: order.type,
  caloriesCount: order.caloriesCount,
  description: order.description,
  rating: order.rating,
  count: order.count,
  total: order.total
});


export const makeOrdersRdo = () => ({
  data: ordersData.map((order) => ({...Object.assign(fakeOrderRdo, fillOrderRdo(order))})),
  pages: 2
});

import {TrainingInterface} from '../types/training.interface';
import {SpecialOfferInterface} from '../components/main-page/special-offer/special-offer.item';
import {DISCOUNT} from '../settings';

export const fillSpecialOffers = (training: TrainingInterface): SpecialOfferInterface => ({
  id: 0,
  src: training.backgroundPath,
  name: training.name,
  text: `горячие предложения на тренировки ${training.name}`,
  price: training.price,
  newPrice: training.price / 100 * (100 - DISCOUNT),
  sup: 'за занятие',
});

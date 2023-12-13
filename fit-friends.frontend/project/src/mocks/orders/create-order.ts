import {PaymentOption, PurchaseType} from '../../enums';

export const createOrder = {
  purchaseType: PurchaseType.membership,
  trainingId: 250,
  price: 2500,
  count: 10,
  total: 25000,
  paymentOption: PaymentOption.mir
};

export const createBalance = {
  trainingId: 250,
  count: 10
};

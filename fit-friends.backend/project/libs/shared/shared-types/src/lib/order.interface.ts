import {PaymentOption, PurchaseType} from './enums';

export interface OrderInterface {
  purchaseType: PurchaseType,
  serviceId: number,
  price: number,
  count: number,
  total: number,
  paymentOption: PaymentOption,
  createDate: Date
}

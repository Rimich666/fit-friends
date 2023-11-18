export interface CreateOrderInterface {
  purchaseType: string;
  trainingId: number;
  price: number;
  count: number;
  total: number;
  paymentOption: string;
}

export interface CreateBalance {
  trainingId: number;
  count: number;
}

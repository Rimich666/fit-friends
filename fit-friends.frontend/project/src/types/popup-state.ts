export type BuyProps = {
  src: string;
  name: string;
  price: number;
  trainingId: number;
}

export type PopupState = {
  buy: BuyProps;
};

export type BuyProps = {
  src: string;
  name: string;
  price: number;
  trainingId: number;
}

export type FeedbackProps = {
  trainingId: number;
}

export type PopupState = {
  buy: BuyProps;
  feedback: FeedbackProps;
  pages: number;
};

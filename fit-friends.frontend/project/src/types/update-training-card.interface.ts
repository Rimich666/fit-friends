export interface UpdateTrainingCardInterface {
  training: {
    name?: string;
    description?: string;
    price?: number;
    isSpecialOffer?: boolean;
  };
  video?: File;
  id: number;
}

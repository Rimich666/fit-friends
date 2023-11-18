import {UpdateTrainingCardInterface} from '../types/update-training-card.interface';

export type UpdateTrainingCard = {
  id: number;
  payload: FormData;
}

export const makeUpdateTrainingCardPayload = (card: UpdateTrainingCardInterface): UpdateTrainingCard => {
  const payload = new FormData();
  payload.append('training', JSON.stringify({...card.training}));
  if (card.video) {
    payload.append('video', card.video);
  }
  return {id: card.id, payload};
};

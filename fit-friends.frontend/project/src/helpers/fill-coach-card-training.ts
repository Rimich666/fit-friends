import {TrainingInterface} from '../types/training.interface';
import {PopularTrainingItemProps} from '../components/main-page/popular-training/popular-training.item';

export const fillCoachCardTraining = (training: TrainingInterface): PopularTrainingItemProps => (
  {
    id: training.id,
    src: training.backgroundPath,
    price: training.price,
    name: training.name,
    type: training.trainingType,
    caloriesCount: training.caloriesCount,
    rating: training.rating,
    description: training.description
  }
);

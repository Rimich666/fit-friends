import {TrainingInterface} from '../types/training.interface';
import {PopularTrainingItemProps} from '../components/main-page/popular-training/popular-training.item';


const fillProp = (training: TrainingInterface): PopularTrainingItemProps => ({
  id: training.id,
  src: training.backgroundPath,
  price: training.price,
  name: training.name,
  type: training.trainingType,
  caloriesCount: training.caloriesCount,
  rating: training.rating,
  description: training.description
});

export const getPopularProps = (trainings: TrainingInterface[]): PopularTrainingItemProps[] =>
  trainings.map((training) => fillProp(training));

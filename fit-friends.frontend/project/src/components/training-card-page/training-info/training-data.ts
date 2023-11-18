import {Gender, TrainingTime, TrainingType} from '../../../enums';

export const trainingData = {
  coach: {
    name: 'Валерия',
    avatar: '/img/content/avatars/coaches/photo-1.png',
  },
  name: 'energy',
  description: 'Упражнения укрепляют мышечный корсет, делают суставы более гибкими, улучшают осанку и координацию.',
  rating: 4,
  type: TrainingType.pilates,
  gender: Gender.all,
  caloriesCount: 340,
  time: TrainingTime['30 - 50'],
  price: 800
};

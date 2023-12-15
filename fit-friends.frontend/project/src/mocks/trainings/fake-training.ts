import {Gender, Level, TrainingTime, TrainingType} from '../../enums';

export const fakeTraining = {
  id: 25,
  name: 'energy',
  backgroundPath: '/img/content/thumbnails/training-02.jpg',
  trainingType: TrainingType.pilates,
  price: 800,
  caloriesCount: 340,
  description: 'Упражнения укрепляют мышечный корсет, делают суставы более гибкими, улучшают осанку и координацию.',
  rating: 4,
  level: Level.professional,
  trainingTime: TrainingTime['30 - 50'],
  gender: Gender.male,
  videoId: 'videoId',
  videoPath: 'videoPath',
  coachId: 'coachId',
  isSpecialOffer: false,
  createDate: new Date()
};

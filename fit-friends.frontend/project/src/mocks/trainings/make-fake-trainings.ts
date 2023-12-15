import {cardData} from './card-data';
import {TrainingInterface} from '../../types/training.interface';
import {Gender, Level, TrainingTime} from '../../enums';

export const makeFakeTrainings = (): TrainingInterface[] => cardData.map((card) => ({
  id: card.id,
  name: card.name,
  backgroundPath: card.src,
  trainingType: card.type,
  price: card.price,
  caloriesCount: card.caloriesCount,
  description: card.description,
  rating: card.rating,
  level: Level.professional,
  trainingTime: TrainingTime['30 - 50'],
  gender: Gender.male,
  videoId: 'videoId',
  videoPath: 'videoPath',
  coachId: 'coachId',
  isSpecialOffer: false,
  createDate: new Date()
}));

export const makeFakeGetTrainings = {
  data: makeFakeTrainings(),
  maxPrice: 3500,
  pages: 6
};

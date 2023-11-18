import {TrainingInterface} from '../types/training.interface';
import {CardInterface} from '../types/card-interface';
import {Gender, TrainingTime, TrainingType} from '../enums';
import {TrainingCardInterface} from '../types/training-card.interface';

export const fillTrainingMiniCard = (training: TrainingInterface): CardInterface => ({
  id: training.id,
  src: training.backgroundPath,
  price: training.price,
  name: training.name,
  rating: training.rating,
  type: training.trainingType as TrainingType,
  caloriesCount: training.caloriesCount,
  description: training.description
});

export const fillTrainingCard = (training: TrainingInterface): TrainingCardInterface => {
  const coach = training.coach ?
    {name: training.coach.name, avatar: training.coach.avatarPath} : {name: '', avatar: ''};

  return {
    coach: coach,
    id: training.id,
    name: training.name,
    description: training.description,
    rating: training.rating,
    type: training.trainingType as TrainingType,
    gender: training.gender as Gender,
    caloriesCount: training.caloriesCount,
    time: training.trainingTime as TrainingTime,
    price: training.price,
    isSpecialOffer: training.isSpecialOffer,
    videoPath: training.videoPath,
    backgroundPath: training.backgroundPath,
  };
};

export const fillUpdateTrainingCard = (training: TrainingInterface, currentState: TrainingCardInterface): TrainingCardInterface => {
  const coach = {...currentState.coach};

  return {
    ...currentState,
    coach: coach,
    isSpecialOffer: training.isSpecialOffer,
    price: training.price,
    videoPath: training.videoPath,
    name: training.name,
    description: training.description
  };
};


export const getEmptyTrainingCard = (): TrainingCardInterface => ({
  coach: {
    name: '',
    avatar: ''
  },
  id: 0,
  name: '',
  description: '',
  rating: 0,
  type: undefined as unknown as TrainingType,
  gender: undefined as unknown as Gender,
  caloriesCount: 0,
  time: undefined as unknown as TrainingTime,
  price: 0,
  isSpecialOffer: false,
  videoPath: '',
  backgroundPath: ''
})

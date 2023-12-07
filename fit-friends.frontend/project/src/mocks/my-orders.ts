import {TrainingType} from '../enums';
import {MyOrderInterface} from '../types/card-interface';

export const ordersData: MyOrderInterface[] = [
  {
    id: 1,
    src: '/img/content/thumbnails/training-01.jpg',
    price: 800,
    name: 'energy',
    type: TrainingType.pilates,
    caloriesCount: 320,
    description: 'Упражнения укрепляют мышечный корсет, делают суставы более гибкими, улучшают осанку и координацию.',
    rating: 4,
    count: 1,
    total: 800
  },
  {
    id: 2,
    src: '/img/content/thumbnails/training-03.jpg',
    price: 1000,
    name: 'boxing',
    type: TrainingType.box,
    caloriesCount: 800,
    rating: 4,
    description: 'Тренировка на отработку правильных ударов, координации и оптимальной механики защитных движений.',
    count: 5,
    total: 5000
  },
  {
    id: 3,
    src: '/img/content/thumbnails/training-05.jpg',
    price: 1400,
    name: 'yoga',
    type: TrainingType.yoga,
    caloriesCount: 250,
    rating: 5,
    description: 'В основе программы лежит работа с телом и с психо-эмоциональным состоянием. Уберем зажимы тела, избавимся от стресса.',
    count: 8,
    total: 11200
  },
  {
    id: 4,
    src: '/img/content/thumbnails/training-04.jpg',
    price: 1200,
    name: 'power',
    type: TrainingType.power,
    caloriesCount: 600,
    rating: 4,
    description: 'Тренировка на&nbsp;отработку правильной техники работы с тяжелыми весами, укрепления мышц кора и спины.',
    count: 12,
    total: 14400
  },
];

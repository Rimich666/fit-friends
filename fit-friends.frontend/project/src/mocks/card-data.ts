import {CardInterface} from '../types/card-interface';
import {TrainingType} from '../enums';


export const cardData: CardInterface[] = [
  {
    id: 1,
    src: '/img/content/thumbnails/training-02.jpg',
    price: 0,
    name: 'crossfit',
    rating: 4,
    type: TrainingType.crossfit,
    caloriesCount: 1200,
    description: 'Сложный комплекс упражнений для профессиональных атлетов на отработку показателей в классическом стиле.'
  },
  {
    id: 2,
    src: '/img/content/thumbnails/training-01.jpg',
    price: 800,
    name: 'energy',
    rating: 3,
    type: TrainingType.pilates,
    caloriesCount: 320,
    description: 'Упражнения укрепляют мышечный корсет, делают суставы более гибкими, улучшают осанку и&nbsp;координацию.'
  },
  {
    id: 3,
    src: '/img/content/thumbnails/training-03.jpg',
    price: 1000,
    rating: 2,
    name: 'boxing',
    type: TrainingType.box,
    caloriesCount: 800,
    description: 'Тренировка на&nbsp;отработку правильных ударов, координации и&nbsp;оптимальной механики защитных движений.'
  },
  {
    id: 4,
    src: '/img/content/thumbnails/training-04.jpg',
    price: 1200,
    rating: 1,
    name: 'power',
    type: TrainingType.power,
    caloriesCount: 600,
    description: 'Тренировка на&nbsp;отработку правильной техники работы с&nbsp;тяжелыми весами, укрепления мышц кора и&nbsp;спины.'
  },
  {
    id: 5,
    src: '/img/content/thumbnails/training-05.jpg',
    price: 1400,
    rating: 0,
    name: 'antistress',
    type: TrainingType.yoga,
    caloriesCount: 250,
    description: 'В&nbsp;основе программы лежит работа с&nbsp;телом и&nbsp;с&nbsp;психо-эмоциональным состоянием. Уберем зажимы тела, избавимся от стресса.'
  },
  {
    id: 6,
    src: '/img/content/thumbnails/training-06.jpg',
    price: 1600,
    name: 'run, forrest, run',
    rating: 4,
    type: TrainingType.running,
    caloriesCount: 500,
    description: 'Узнайте правильную технику бега, развивайте выносливость и&nbsp;откройте для себя все секреты длительных пробежек.'
  },
  {
    id: 7,
    src: '/img/content/thumbnails/training-07.jpg',
    price: 1600,
    name: 'fitball',
    rating: 5,
    type: TrainingType.pilates,
    caloriesCount: 200,
    description: 'Тренировка на&nbsp;фитболе&nbsp;&mdash; отличном тренажере для развития чувства баланса и&nbsp;равновесия, улучшения координации.'
  },
  {
    id: 8,
    src: '/img/content/thumbnails/training-08.jpg',
    price: 1800,
    name: 'hatha',
    rating: 5,
    type: TrainingType.yoga,
    caloriesCount: 350,
    description: 'Упражнения по&nbsp;хатха йоге, направленные на&nbsp;понижение нервной возбудимости и&nbsp;активацию процессов анаболизма.'
  },
  {
    id: 9,
    src: '/img/content/thumbnails/training-09.jpg',
    price: 1800,
    name: 'full body stretch',
    rating: 4,
    type: TrainingType.stretching,
    caloriesCount: 400,
    description: 'Комплекс упражнений на&nbsp;растяжку всего тела для новичков. Плавное погружение в&nbsp;стретчинг и&nbsp;умеренная нагрузка.'
  },
  {
    id: 10,
    src: '/img/content/thumbnails/training-10.jpg',
    price: 2000,
    name: 'upper body',
    rating: 4,
    type: TrainingType.power,
    caloriesCount: 800,
    description: 'Проработка мышц груди для профи, экспериментируем с&nbsp;уровнем наклона скамьи и&nbsp;различной шириной хвата.'
  },
  {
    id: 11,
    src: '/img/content/thumbnails/training-11.jpg',
    price: 2200,
    name: 'devil`s cindy',
    rating: 4,
    type: TrainingType.crossfit,
    caloriesCount: 950,
    description: 'Знаменитый кроссфит комплекс. Синди&nbsp;&mdash; универсальная тренировка для развития функциональной силы.'
  },
  {
    id: 12,
    src: '/img/content/thumbnails/training-12.jpg',
    price: 2400,
    name: 'fleksbend',
    rating: 4,
    type: TrainingType.aerobics,
    caloriesCount: 450,
    description: 'Тренируясь с&nbsp;резинкой для фитнеса, вы можете проработать почти все мышечные группы и&nbsp;разнообразить тренировки.'
  },
];

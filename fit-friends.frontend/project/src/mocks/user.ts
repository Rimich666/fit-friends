import {TrainingType, UserLocation} from '../enums';

export const user = {
  src: '',
  name: 'Валерия',
  location: UserLocation.starry,
  description: `Привет! Меня зовут Иванова Валерия, мне 34 года. Я профессиональный тренер по боксу.
     Не боюсь пробовать новое, также увлекаюсь кроссфитом, йогой и силовыми тренировками. Провожу как индивидуальные
     тренировки, так и групповые занятия. Помогу вам достигнуть своей цели и сделать это с удовольствием!`,
  trainingType: [TrainingType.box, TrainingType.crossfit, TrainingType.power, TrainingType.yoga],
  daysCalories: 1200,

};

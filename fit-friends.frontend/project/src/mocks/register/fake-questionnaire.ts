import {Level, TrainingTime, TrainingType} from '../../enums';

const file = undefined as unknown as File;
export const fakeQuestionnaire = {
  certificate: [file, file, file],
  merits: 'string merits',
  isReady: true,

  trainingTime: TrainingTime['10 - 30'],
  trainingCalories: 1800,
  daysCalories: 2800,

  level: Level.professional,
  trainingType: [TrainingType.yoga, TrainingType.box, TrainingType.power],
};

import {TrainingTime} from '@project/shared-types';

export const trainingTypeError = () =>
  `trainingTime must be one of the following values: ${Object.values(TrainingTime)
    .map((item) => `'${item}'`).join(', ')}`;

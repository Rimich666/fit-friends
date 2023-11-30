import {UpdateTrainingErrorInterface} from '../types/update-training-error.interface';

export const getEmptyUpdateTrainingErrors = (): UpdateTrainingErrorInterface => (
  {
    name: '',
    description: '',
    video: '',
  }
);

export const fillUpdateTrainingErrors = (errors: {[k: string]: string}): UpdateTrainingErrorInterface => ({
  name: errors.name,
  description: errors.description,
  video: errors.video
});

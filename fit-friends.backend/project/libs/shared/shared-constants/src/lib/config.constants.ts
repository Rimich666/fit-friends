import {join} from 'path';

export const PROJECT_PATH = join(__dirname , '..', '..', '..');

export const FIELD_SEPARATOR = '|';
export const Static = {
  ROOT_PATH: join(__dirname , '..', '..', '..', 'apps', 'bff', 'static'),
  SERVE_ROOT: '/static',
  HOST: 'localhost',
  Endpoint: {
    USER: 'users',
    TRAINING: 'trainings'
  }
};

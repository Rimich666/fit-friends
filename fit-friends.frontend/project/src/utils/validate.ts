import {arrayNotEmpty, maxLength, minLength, required, Validator} from './validators';
import {Field, Types} from '../types/field.interface';

export const registerValidators: {[k: string]: Validator<Types>[]} = {
  name: [required(), maxLength(15), minLength(1)],
  password: [required(), maxLength(12), minLength(6)],
  description: [required(), maxLength(140), minLength(10)],
  merits: [required(), maxLength(140), minLength(10)],
  avatar: [required()],//{max: 1024 * 1024},
  email: [required()],
  birthDate: [required()],
  gender: [required()],
  location: [required()],
  role: [required()]
};

export const questionnaireValidators = {
  certificate: [required()],
  merits: [required()],
  isReady: [],
  trainingTime: [required()],
  trainingCalories: [required()],
  daysCalories: [required()],
  level: [required()],
  trainingType: [arrayNotEmpty()]
};

export const updateUserValidators: {[k: string]: Validator<Types>[]} = {
  name: [required(), maxLength(15), minLength(1)],
  description: [required(), maxLength(140), minLength(10)],
  avatar: [],//{max: 1024 * 1024},
  gender: [required()],
  location: [required()],
  trainingType: [arrayNotEmpty()],
  level: [required()],
};

export const createTrainingValidators: {[k: string]: Validator<Types>[]} = {
  name: [required(), maxLength(15), minLength(1)],
  level: [required()],
  trainingType: [required()],
  trainingTime: [required()],
  price: [],
  caloriesCount: [required()],
  description: [required()],
  gender: [required()],
  video: [required()],
};

export const validate = <T extends Field>(field: T, validators: {[k: string]: Validator<Types>[]}) =>
  Object.fromEntries(Object.keys(field).map((key) =>
    validators[key as keyof typeof validators] ?
      ([key, validators[key as keyof typeof validators]
        .reduce(
          (acc, validator) => acc === '' ? validator(field[key]) : acc
          , '')
      ]) : ([key, ''])
  ));

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
  isReady: [required()],
  trainingTime: [required()],
  trainingCalories: [required()],
  daysCalories: [required()],
  level: [required()],
  trainingType: [arrayNotEmpty()]
};


export const validate = <T extends Field>(field: T, validators: {[k: string]: Validator<Types>[]}) =>
  Object.fromEntries(Object.keys(field).map((key) =>
    ([key, validators[key as keyof typeof validators]
      .reduce(
        (acc, validator) =>
          acc === '' ? validator(field[key]) : acc
        , '')
    ])
  ));

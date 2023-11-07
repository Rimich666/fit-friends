import {Types} from '../types/field.interface';

export type Validator<T> = (params: T) => string;
export type GetValidator<Options, Params> = (options?: Options) => Validator<Params>;

export const maxLength: GetValidator<number, Types> = (max) =>
  (value) => (value as string).length > (max as number) ?
    `Длинна строки не должна превышать ${max as number} символов` : '';

export const minLength: GetValidator<number, Types> = (min) =>
  (value) => (value as string).length < (min as number) ?
    `Длинна строки не должна быть меньше ${min as number} символов` : '';

export const required: GetValidator<void, Types> = () =>
  (value) => {
    const isExist = !!value;
    return isExist ? '' : 'Поле обязательно для заполнения';
  };

export const arrayNotEmpty: GetValidator<void, Types> = () =>
  (value) => {
    return (value as string[]).length === 0 ?
      'Выберите хотя бы один элемент.' : '';
  };



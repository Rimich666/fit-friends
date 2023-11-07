import {ComponentVariant} from '../../settings';

export const divClass = {
  [ComponentVariant.register]: 'questionnaire-coach__checkbox',
  [ComponentVariant.update]: 'custom-toggle custom-toggle--switch user-info__toggle'
};

export const svgClass = {
  [ComponentVariant.register]: 'questionnaire-coach__checkbox-icon',
  [ComponentVariant.update]: 'custom-toggle__icon'
};

export const text = {
  [ComponentVariant.register]: 'Хочу дополнительно индивидуально тренировать',
  [ComponentVariant.update]: 'Готов тренировать'
};

export const name = {
  [ComponentVariant.register]: 'ready-for-training',
  [ComponentVariant.update]: 'individual-training'
};

export const textClass = {
  [ComponentVariant.register]: 'questionnaire-coach__checkbox-label',
  [ComponentVariant.update]: 'custom-toggle__label'
};

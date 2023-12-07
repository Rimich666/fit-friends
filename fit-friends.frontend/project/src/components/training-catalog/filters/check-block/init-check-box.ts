import {TrainingTime, TrainingType, UserLocation} from '../../../../enums';
import {CheckType, getCheckType} from '../../variances';
import {ComponentVariant} from '../../../../component-variant';

type CheckBlock = typeof TrainingType | typeof TrainingTime | typeof UserLocation

export const fillCheckBox = (list: CheckBlock) =>
  Object.fromEntries(Object.keys(list).map((key) => [key, true]));

export const switchCheckBox = (variant: CheckType) => {
  switch (variant) {
    case CheckType.specialization:
      return fillCheckBox(TrainingType);
    case CheckType.time:
      return fillCheckBox(TrainingTime);
    case CheckType.location:
      return fillCheckBox(UserLocation);
  }
  return {p: false};
};

export const initCheckBox = (variant: ComponentVariant) =>
  Object.fromEntries(getCheckType(variant).map((type) => ([type, switchCheckBox(type)])));

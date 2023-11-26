import Input from '../../input/input';
import {Inputs} from '../../input/inputs';
import React from 'react';
import TextArea from '../../text-area/text-area';
import SpecializationCheckbox from '../../specialization-checkbox/specialization.checkbox';
import {Role} from '../../../enums';
import CustomSelect from '../../custom-select/custom-select';
import {selectors} from './selectors';
import {UpdateUserInterface} from '../../../types/update-user.interface';
import {UpdateUserErrorsInterface} from '../../../types/update-user-errors.interface';
import ReadyCheck from '../../ready-check/ready.check';
import {UserInfoMode} from '../constants';
import {ComponentVariant} from '../../../component-variant';

export interface UserInfoFormProps {
  mode: UserInfoMode;
  user: UpdateUserInterface;
  changeMode: () => void;
  onInputName: (text: string) => void;
  onInputDescription: (text: string) => void;
  onSelect: (key: string) => (value: never) => void;
  onCheck: (value: boolean) => void;
  onChangeType: () => void;
  errors: UpdateUserErrorsInterface;
}

export default function UserInfoForm({mode, errors, user, ...props}: UserInfoFormProps): JSX.Element {
  const isRead = mode === UserInfoMode.read;
  const variant = ComponentVariant.update;

  return (
    <form className={`user-info${mode}__form`} action="#" method="post">
      <button className="btn-flat btn-flat--underlined user-info__edit-button"
        type="button" aria-label={isRead ? 'Редактировать' : 'Сохранить'} onClick={props.changeMode}
      >
        <svg width="12" height="12" aria-hidden="true">
          <use xlinkHref="#icon-edit"/>
        </svg>
        <span>{isRead ? 'Редактировать' : 'Сохранить'}</span>
      </button>
      <div className={`user-info${mode}__section`}>
        <h2 className={`user-info${mode}__title`}>Обо мне</h2>
        <Input {...{...Inputs.name,
          callback: props.onInputName,
          class: `${isRead ? 'custom-input--readonly' : ''} user-info${mode}__input`,
          value: user.name,
          disabled: isRead,
          errorMessage: errors.name
        }}
        />
        <TextArea class={`${isRead ? 'custom-textarea--readonly' : ''} user-info${mode}__textarea`}
          label={'Описание'} callback={props.onInputDescription} errorMessage={errors.description}
          disabled={isRead} value={user.description}
        />
      </div>
      <div className="user-info__section user-info__section--status">
        <h2 className="user-info__title user-info__title--status">Статус</h2>
        <ReadyCheck isChecked={user.isReady} callback={props.onCheck} variant={ComponentVariant.update}
          isDisabled={isRead}
        />
      </div>
      <SpecializationCheckbox
        role={Role.sportsman}
        trainingTypes={user.trainingType}
        errorMessage={errors.trainingType}
        variant={ComponentVariant.update}
        callback={props.onChangeType}
        isDisabled={isRead}
      />
      {Object.keys(selectors).map((key) => (
        <CustomSelect
          {...{...selectors[key as keyof typeof selectors],
            callback: props.onSelect(key),
            errorMessage: errors[key as keyof UpdateUserErrorsInterface],
            disabled: isRead,
            value: user[key as keyof UpdateUserInterface] as string,
            variant,
            mode
          }}
          key={key}
        />
      ))}
    </form>
  );
}

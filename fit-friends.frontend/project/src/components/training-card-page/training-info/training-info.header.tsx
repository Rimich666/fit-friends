import {Role} from '../../../enums';
import React from 'react';

type TrainingInfoHeaderProps = {
  role: Role;
  name: string;
  avatar: string;
  callback: (value: string) => void;
}

export default function TrainingInfoHeader({role, name, avatar, callback}: TrainingInfoHeaderProps): JSX.Element {

  const clickHandle = (evt: React.FormEvent<HTMLButtonElement>) => {
    callback(evt.currentTarget.value);
  };

  return (
    <div className="training-info__header">
      <div className="training-info__coach">
        <div className="training-info__photo">
          <picture>
            <img src={avatar} width="64" height="64" alt="Изображение тренера"/>
          </picture>
        </div>
        <div className="training-info__coach-info">
          <span className="training-info__label">Тренер</span>
          <span className="training-info__name">{name}</span>
        </div>
      </div>
      {role === Role.coach &&
        <>
          <button className="btn-flat btn-flat--light training-info__edit training-info__edit--edit" type="button"
            value="edit" onClick={clickHandle}
          >
            <svg width="12" height="12" aria-hidden="true">
              <use xlinkHref="#icon-edit"/>
            </svg>
            <span>Редактировать</span>
          </button>
          <button className="btn-flat btn-flat--light btn-flat--underlined training-info__edit training-info__edit--save"
            type="button" value="save" onClick={clickHandle}
          >
            <svg width="12" height="12" aria-hidden="true">
              <use xlinkHref="#icon-edit"/>
            </svg>
            <span>Сохранить</span>
          </button>
        </>}
    </div>
  );
}

import {Role, TrainingType, UserLocation} from '../../enums';
import React from 'react';
import FriendButton from './friend.button';

const user = {
  src: '',
  name: 'Валерия',
  location: UserLocation.starry,
  description: `Привет! Меня зовут Иванова Валерия, мне 34 года. Я профессиональный тренер по боксу.
     Не боюсь пробовать новое, также увлекаюсь кроссфитом, йогой и силовыми тренировками. Провожу как индивидуальные
     тренировки, так и групповые занятия. Помогу вам достигнуть своей цели и сделать это с удовольствием!`,
  specialization: [TrainingType.box, TrainingType.crossfit, TrainingType.power, TrainingType.yoga],
};

export type UserCardCardProps = {
  id: string;
  role: Role;
  src: string;
  name: string;
  location: string;
  isReady: boolean;
  description: string;
  specialization: string[];
  imagePath: string;
  onPlaceClick: () => void;
}

export default function UserCardCard({role, ...props}: UserCardCardProps): JSX.Element {
  const tail = role === Role.coach ? '-coach' : '';

  const placeClickHandle = (evt: React.FormEvent<HTMLElement>) => {
    evt.preventDefault();
    props.onPlaceClick();
  };

  return (
    <>
      <div className={`user-card${tail}__content`}>
        <div className={`user-card${tail}__head`}>
          <h2 className={`user-card${tail}__title`}>{props.name}</h2>
        </div>
        <div className={`user-card${tail}__label`}>
          <a href="#" onClick={placeClickHandle}>
            <svg className={`user-card${tail}__icon-location`} width="12" height="14" aria-hidden="true">
              <use xlinkHref="#icon-location"/>
            </svg>
            <span>{props.location}</span>
          </a>
        </div>
        {role === Role.coach &&
          <div className={`user-card${tail}__status-container`}>
            <div className={`user-card${tail}__status user-card-coach__status--tag`}>
              <svg className={`user-card${tail}__icon-cup`} width="12" height="13" aria-hidden="true">
                <use xlinkHref="#icon-cup"/>
              </svg>
              <span>Тренер</span>
            </div>
            <div className={`user-card${tail}__status user-card-coach__status--check`}>
              <span>{props.isReady ? 'Готов тренировать' : 'Не готов тренировать'}</span>
            </div>
          </div>}
        {role === Role.sportsman &&
          <div className="user-card__status">
            <span>{props.isReady ? 'Готов к тренировке' : 'Не готов к тренировке'}</span>
          </div>}
        <div className={`user-card${tail}__text`}>
          <p>{props.description}</p>
        </div>
        {role === Role.coach && (
          <button className="btn-flat user-card-coach__sertificate" type="button">
            <svg width="12" height="13" aria-hidden="true">
              <use xlinkHref="#icon-teacher"/>
            </svg><span>Посмотреть сертификаты</span>
          </button>
        )}
        <ul className={`user-card${tail}__hashtag-list`}>
          {props.specialization.map((type) => (
            <li className={`user-card${tail}__hashtag-item`} key={type}>
              <div className="hashtag">
                <span>{`#${type}`}</span>
              </div>
            </li>
          ))}
        </ul>
        <FriendButton tail={tail} id={props.id}/>
      </div>
      <div className={`user-card${tail}__gallary`}>
        <ul className={`user-card${tail}__gallary-list`}>
          <li className={`user-card${tail}__gallary-item`}>
            <img src={props.imagePath} width="334" height="573" alt="photo1"/>
          </li>
          <li className={`user-card${tail}__gallary-item`}>
            <img src={props.imagePath} width="334" height="573" alt="photo2"/>
          </li>
        </ul>
      </div>
    </>
  );
}

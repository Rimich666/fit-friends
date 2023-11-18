import {Direction} from '../../../enums';
import React from 'react';
import {ComponentVariant} from '../../../component-variant';

type SliderControlsProps = {
  class: string;
  outlined: boolean;
  callback: (value: Direction) => void;
  variant: ComponentVariant;
}

export default function SliderControls({variant, ...props}: SliderControlsProps): JSX.Element {
  const clickHandle = (evt: React.FormEvent<HTMLButtonElement>) => {
    props.callback(parseInt(evt.currentTarget.value, 10));
  };

  return (
    <>{(variant !== ComponentVariant.userCard) &&
      <div className={`${props.class}__controls`}>
        <button className={`btn-icon ${props.class}__control ${props.outlined ? 'btn-icon--outlined' : ''}`}
          type="button" aria-label="previous" value={Direction.back} onClick={clickHandle}
        >
          <svg width="16" height="14" aria-hidden="true">
            <use xlinkHref="#arrow-left"/>
          </svg>
        </button>
        <button className={`btn-icon ${props.class}__control ${props.outlined ? 'btn-icon--outlined' : ''}`}
          type="button" aria-label="next" value={Direction.forward} onClick={clickHandle}
        >
          <svg width="16" height="14" aria-hidden="true">
            <use xlinkHref="#arrow-right"/>
          </svg>
        </button>
      </div>}
    {variant === ComponentVariant.userCard &&
        <div className="user-card-coach__training-bts">
          <button className="btn-icon user-card-coach__training-btn" type="button" aria-label="back"
            value={Direction.back} onClick={clickHandle}
          >
            <svg width="14" height="10" aria-hidden="true">
              <use xlinkHref="#arrow-left"/>
            </svg>
          </button>
          <button className="btn-icon user-card-coach__training-btn" type="button" aria-label="next"
            value={Direction.forward} onClick={clickHandle}
          >
            <svg width="14" height="10" aria-hidden="true">
              <use xlinkHref="#arrow-right"/>
            </svg>
          </button>
        </div>}
    </>
  );
}

import {Direction} from '../../../enums';
import React from 'react';

type SliderControlsProps = {
  class: string;
  outlined: boolean;
  callback: (value: Direction) => void;
}

export default function SliderControls(props: SliderControlsProps): JSX.Element {
  const clickHandle = (evt: React.FormEvent<HTMLButtonElement>) => {
    props.callback(parseInt(evt.currentTarget.value, 10));
  };

  return (
    <div className={`${props.class}__controls`}>
      <button className={`btn-icon ${props.class}__control ${props.outlined ? 'btn-icon--outlined' : ''}`}
        type="button" aria-label="previous" value={Direction.back} onClick={clickHandle}
      >
        <svg width="16" height="14" aria-hidden="true">
          <use xlinkHref="#arrow-left"></use>
        </svg>
      </button>
      <button className={`btn-icon ${props.class}__control ${props.outlined ? 'btn-icon--outlined' : ''}`}
        type="button" aria-label="next" value={Direction.forward} onClick={clickHandle}
      >
        <svg width="16" height="14" aria-hidden="true">
          <use xlinkHref="#arrow-right"></use>
        </svg>
      </button>
    </div>
  );
}

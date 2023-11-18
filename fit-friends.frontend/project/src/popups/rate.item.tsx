import React from 'react';

type RateItemProps = {
  value: number;
  isCheck: boolean;
  callback: (value: number, isCheck: boolean) => void;
}

export default function RateItem({value, callback, isCheck}: RateItemProps): JSX.Element {

  const clickHandle = (evt: React.FormEvent<HTMLInputElement>) => {
    callback(parseInt(evt.currentTarget.value, 10), !isCheck);
  };

  return (
    <li className="popup__rate-item">
      <div className="popup__rate-item-wrap">
        <label>
          <input type="radio" name="оценка тренировки" aria-label={`оценка ${value}.`} value={value} checked={isCheck}
            onClick={clickHandle}
          />
          <span className="popup__rate-number">{value}</span>
        </label>
      </div>
    </li>
  );
}


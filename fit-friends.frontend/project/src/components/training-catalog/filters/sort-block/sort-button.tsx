import React from 'react';

export enum TrainingSort {
  cheaper = 'Дешевле',
  expensive = 'Дороже',
  freebie = 'Бесплатно'
}

type SortButtonProps = {
  sort: string;
  isCheck: boolean;
  callback: (value: string, isCheck: boolean) => void;
}

export default function SortButton({sort, isCheck, callback}: SortButtonProps): JSX.Element {
  const clickHandle = (evt: React.FormEvent<HTMLInputElement>) => {
    callback(evt.currentTarget.value, !isCheck);
  };
  return (
    <label>
      <input type="radio" name="sort" checked={isCheck} value={sort} onClick={clickHandle}/>
      <span className="btn-radio-sort__label">{TrainingSort[sort as keyof typeof TrainingSort]}</span>
    </label>
  );
}

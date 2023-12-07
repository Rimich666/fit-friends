import React from 'react';

export enum RoleSort {
  coach = 'Тренеры',
  sportsman = 'Пользователи'
}

type RoleButtonProps = {
  role: string;
  isCheck: boolean;
  callback: (value: string, isCheck: boolean) => void;
}

export default function RoleButton({role, isCheck, callback}: RoleButtonProps): JSX.Element {
  const clickHandle = (evt: React.FormEvent<HTMLInputElement>) => {
    callback(evt.currentTarget.value, !isCheck);
  };

  return (
    <label>
      <input type="radio" name="sort" checked={isCheck} value={role} onClick={clickHandle} data-testid={`check-sort-${role}`}/>
      <span className="btn-radio-sort__label">{RoleSort[role as keyof typeof RoleSort]}</span>
    </label>
  );
}

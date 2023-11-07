import {Role} from '../../../enums';
import SelectRoleButton from '../select-role-button/select-role-button';
import {useEffect, useState} from 'react';

type SelectRoleGroupProps = {
  callback: (value: string) => void;
  value: Role;
}

export default function SelectRoleGroup({value, callback}: SelectRoleGroupProps): JSX.Element {
  const [role, setRole] = useState(undefined as unknown as Role);
  useEffect(() => {
    setRole(value);
  }, [value]);

  const onSelect = (selected: Role) => {
    setRole(selected);
    callback(selected);
  };

  return (
    <div className="sign-up__role">
      <h2 className="sign-up__legend">Выберите роль</h2>
      <div className="role-selector sign-up__role-selector">
        {Object.keys(Role).map((key) => (
          <SelectRoleButton {...{callback: onSelect, value: Role[key as keyof typeof Role], checked: key === role}} key={key}/>
        ))}
      </div>
    </div>
  );
}

import SortButton from '../sort-block/sort-button';
import RoleButton, {RoleSort} from './role.button';
import {useState} from 'react';

type RoleBlockProps = {
  callback: (value: string) => void;
}

export default function RoleBlock({callback}: RoleBlockProps): JSX.Element {
  const [role, setRole] = useState('');

  const onClick = (value: string, isCheck: boolean) => {
    const roleValue = isCheck ? value : '';
    setRole(roleValue);
    callback(roleValue);
  };

  return (
    <div className="user-catalog-form__block">
      <h3 className="user-catalog-form__title user-catalog-form__title--sort">Сортировка</h3>
      <div className="btn-radio-sort">
        {Object.keys(RoleSort).map((key) => (
          <RoleButton role={key} isCheck={key === role} key={key} callback={onClick}/>
        )
        )}
      </div>
    </div>
  );
}

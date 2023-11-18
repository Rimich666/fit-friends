import {useState} from 'react';
import SortButton, {TrainingSort} from './sort-button';

type SortBlockProps = {
  callback: (value: string) => void;
}

export default function SortBlock({callback}: SortBlockProps): JSX.Element {
  const [sort, setSort] = useState('');

  const onClick = (value: string, isCheck: boolean) => {
    const sortValue = isCheck ? value : '';
    setSort(sortValue);
    callback(sortValue);
  };

  return (
    <div className="btn-radio-sort gym-catalog-form__radio">
      {Object.keys(TrainingSort).map((key) => (
        <SortButton sort={key} isCheck={key === sort} key={key} callback={onClick}/>
      )
      )}
    </div>
  );
}

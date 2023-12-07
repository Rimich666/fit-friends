import {CheckClass, CheckTitle, getIterable, getLabel} from '../../variances';
import FilterCheckbox from './filter.checkbox';
import {useState} from 'react';
import {ComponentVariant} from '../../../../component-variant';

type FilterCheckBlockProps = {
  type: string;
  formClass: string;
  checked: {[p: string]: boolean};
  callback: (type: string, value: {[p: string]: boolean}) => void;
  variant: ComponentVariant;
}

const CHECK_LIMIT = 5;

export default function FilterCheckBlock({type, formClass, checked, callback, variant}: FilterCheckBlockProps): JSX.Element {
  const [check] = useState(checked);
  const iterable = getIterable(type);
  const label = getLabel(type);
  const [all, setAll] = useState(variant !== ComponentVariant.userCatalog);

  const length = Object.keys(iterable).length;
  const limit = all ? length : Math.min(CHECK_LIMIT, length);
  const rotate = all ? 180 : 0;

  const onCheck = (value: string, isCheck: boolean) => {
    check[value] = isCheck;
    callback(type, check);
  };

  return (
    <div className={`${formClass}__block ${formClass}__block--${CheckClass[type as keyof typeof CheckClass]}`}>
      <h4 className={`${formClass}__block-title`}>{CheckTitle[type as keyof typeof CheckTitle]}</h4>
      <ul className={`${formClass}__check-list`}>
        {Object.keys(iterable).slice(0, limit).map((key) => (
          <FilterCheckbox
            type={type}
            value={key}
            isCheck={check[key]}
            callback={onCheck}
            label={label[key as keyof typeof label]}
            formClass={formClass}
            key={key}
          />))}
      </ul>
      {variant === ComponentVariant.userCatalog && (
        <button className={`btn-show-more ${formClass}__btn-show`} type="button" onClick={() => {setAll(!all);}}>
          <span>{all ? 'Свернуть' : 'Посмотреть все'}</span>
          <svg className="btn-show-more__icon" width="10" height="4" aria-hidden="true" style={{rotate: `${rotate}deg`}}>
            <use xlinkHref="#arrow-down"/>
          </svg>
        </button>
      )}
    </div>);
}

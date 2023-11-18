import {CheckClass, CheckTitle, getIterable, getLabel} from '../variances';
import FilterCheckbox from './filter.checkbox';
import {useState} from 'react';
import {ComponentVariant} from '../../../component-variant';

type FilterCheckBlockProps = {
  type: string;
  formClass: string;
  checked: {[p: string]: boolean};
  callback: (type: string, value: {[p: string]: boolean}) => void;
  variant: ComponentVariant;
}

export default function FilterCheckBlock({type, formClass, checked, callback, variant}: FilterCheckBlockProps): JSX.Element {
  const [check] = useState(checked);
  const iterable = getIterable(type);
  const label = getLabel(type);

  const onCheck = (value: string, isCheck: boolean) => {
    check[value] = isCheck;
    callback(type, check);
  };

  return (
    <div className={`${formClass}__block ${formClass}__block--${CheckClass[type as keyof typeof CheckClass]}`}>
      <h4 className={`${formClass}__block-title`}>{CheckTitle[type as keyof typeof CheckTitle]}</h4>
      <ul className={`${formClass}__check-list`}>
        {Object.keys(iterable).map((key) => (
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
        <button className={`btn-show-more ${formClass}__btn-show`} type="button">
          <span>Посмотреть все</span>
          <svg className="btn-show-more__icon" width="10" height="4" aria-hidden="true">
            <use xlinkHref="#arrow-down"/>
          </svg>
        </button>
      )}
    </div>);
}

import {FormClass, getCheckType, RangeTypes} from '../variances';
import RangeBlock from './range-block/range-block';
import {ComponentVariant} from '../../../component-variant';
import FilterCheckBlock from './filter-check-block';
import LevelRadioBlock from '../../level-radio-block';
import {Level, Role} from '../../../enums';
import {RangeConstraint} from '../../../types/states/training-state';
import SortBlock from './sort-block/sort-block';
import RoleBlock from './role-block/role-block';
import React, {useState} from 'react';
import {initCheckBox} from './init-check-box';

type FiltersProps = {
  variant: ComponentVariant;
  onChangeRange: (type: string, range: RangeConstraint) => void;
  onChangeRole: (value: string) => void;
  onCheck: (type: string, value: {[p: string]: boolean}) => void;
  onSelectLevel: (value: Level) => void;
  onChangeSort: (value: string) => void;
}

export default function Filters({variant, ...props}: FiltersProps):JSX.Element {
  const formClass = FormClass[variant as keyof typeof FormClass];
  const [check] = useState(initCheckBox(variant));

  const onCheck = (type: string, value: {[p: string]: boolean}) => {
    check[type as keyof typeof check] = value;
    props.onCheck(type, value);
  };

  return (
    <form className={`${formClass}__form`} onSubmit={(evt)=>{evt.preventDefault();}}>
      {(variant === ComponentVariant.myTraining || variant === ComponentVariant.trainingCatalog) &&
        Object.keys(RangeTypes).map((key) => (
          <RangeBlock
            callback={props.onChangeRange}
            formClass={formClass}
            type={RangeTypes[key as keyof typeof RangeTypes]}
            key={key}
          />))}

      {getCheckType(variant).map((type) => (
        <FilterCheckBlock type={type} formClass={formClass} checked={check[type as keyof typeof check]}
          callback={onCheck} variant={variant} key={type}
        />
      ))}

      {variant === ComponentVariant.trainingCatalog &&
        <div className="gym-catalog-form__block gym-catalog-form__block--sort">
          <h4 className="gym-catalog-form__title gym-catalog-form__title--sort">Сортировка</h4>
          <SortBlock callback={props.onChangeSort}/>
        </div>}
      {variant === ComponentVariant.userCatalog && (
        <>
          <LevelRadioBlock callback={props.onSelectLevel} value={undefined as unknown as Level} role={Role.sportsman}
            variant={ComponentVariant.userCatalog}
          />
          <RoleBlock callback={props.onChangeRole}/>

        </>
      )}
    </form>
  );
}

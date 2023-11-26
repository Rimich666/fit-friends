import {RangeClass, RangeName} from '../../variances';
import React, {useLayoutEffect, useState} from 'react';
import {RangeConstraint} from '../../../../types/states/training-state';

type InputsBlockProps = {
  type: string;
  min: number;
  max: number;
  callback: (range: {min: number; max: number}) => void;
  range: RangeConstraint;
}

export default function InputsBlock({type, ...props}: InputsBlockProps): JSX.Element {
  const [inputMin, setInputMin] = useState(props.min.toString());
  const [inputMax, setInputMax] = useState(props.max.toString());

  useLayoutEffect(() => {
    setInputMax(Math.round(props.range.max).toString());
  }, [props.range.max]);

  useLayoutEffect(() => {
    setInputMin(Math.round(props.min).toString());
    setInputMax(Math.round(props.max).toString());
  }, [props.min, props.max]);

  const inputMinHandle = (evt: React.FormEvent<HTMLInputElement>) => {
    setInputMin(evt.currentTarget.value);
  };

  const inputMaxHandle = (evt: React.FormEvent<HTMLInputElement>) => {
    setInputMax(evt.currentTarget.value);
  };

  const getMinValue = () => {
    const min = parseInt(inputMin, 10);
    const max = parseInt(inputMax, 10);

    if (min < props.range.min) {
      return props.range.min;
    }
    if (min > max) {
      return max;
    }
    return min;
  };

  const getMaxValue = () => {
    const min = parseInt(inputMin, 10);
    const max = parseInt(inputMax, 10);
    if (max > props.range.max) {
      return props.range.max;
    }
    if (max < min) {
      return min;
    }
    return max;
  };

  const changeMinHandle = (evt: React.FormEvent<HTMLInputElement>) => {
    const min = getMinValue();
    const max = parseInt(inputMax, 10);
    setInputMin(min.toString());
    props.callback({min, max});
  };

  const changeMaxHandle = (evt: React.FormEvent<HTMLInputElement>) => {
    const max = getMaxValue();
    const min = parseInt(inputMin, 10);
    setInputMax(max.toString());
    props.callback({min, max});
  };

  const name = RangeName[type as keyof typeof RangeName];

  const rangeClass = RangeClass[type as keyof typeof RangeClass];
  return (
    <div className={`filter-${rangeClass}`}>
      <div className={`filter-${rangeClass}__input-text filter-${rangeClass}__input-text--min`}>
        <input type="number" id={`text-min${name}`} name={`text-min${name}`} value={inputMin}
          onInput={inputMinHandle} onBlur={changeMinHandle}
        />
        <label htmlFor="text-min">от</label>
      </div>
      <div className={`filter-${rangeClass}__input-text filter-${rangeClass}__input-text--max`}>
        <input type="number" id={`text-max${name}`} name={`text-max${name}`} value={inputMax}
          onInput={inputMaxHandle} onBlur={changeMaxHandle}
        />
        <label htmlFor="text-max">до</label>
      </div>
    </div>
  );
}

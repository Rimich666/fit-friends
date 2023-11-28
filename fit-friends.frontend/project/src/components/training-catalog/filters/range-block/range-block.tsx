import {ControlClass, RangeClass, RangeTitle, RangeTypes} from '../../variances';
import InputsBlock from './inputs-block';
import {useAppSelector} from '../../../../hooks';
import {makeSelectRangeConstraint} from '../../../../store/training-process/training.selectors';
import React, {useEffect, useRef, useState} from 'react';
import {RangeConstraint} from '../../../../types/states/training-state';

type RangeBlockProps = {
  formClass: string;
  type: string;
  callback: (type: string, currentRange: RangeConstraint) => void;
}

const Options = {
  DEFAULT_SCALE_WIDTH: 312,
  BUTTON_SIZE: 16,
};

export default function RangeBlock({formClass, type, callback}: RangeBlockProps): JSX.Element {
  const rangeSelector = makeSelectRangeConstraint;
  const range = useAppSelector((state) => rangeSelector(state, type));
  const [currentRange, setCurrentRange] = useState({...range});
  const scale = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const minButton = useRef<HTMLButtonElement>(null);
  const maxButton = useRef<HTMLButtonElement>(null);
  const [widthBar, setWidthBar] =
    useState(Options.DEFAULT_SCALE_WIDTH);
  const [minLeft, setMinLeft] = useState(-Options.BUTTON_SIZE / 2);
  const [maxLeft, setMaxLeft] =
    useState(Options.DEFAULT_SCALE_WIDTH - Options.BUTTON_SIZE / 2);
  const [isDown] = useState({min: false, max: false});

  useEffect(() => {
    if (scale.current && minButton.current) {
      setWidthBar(scale.current.offsetWidth);

    }
  }, [scale.current]);
  useEffect(() => {
    setCurrentRange({...range});
  }, [range]);

  const endDrag = () => {
    if (!isDown.max && !isDown.min) {
      return;
    }
    isDown.min = false;
    isDown.max = false;
    callback(type, currentRange);
  };

  const mouseUpHandle = (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    endDrag();
  };

  const mouseLeaveHandle = () => {
    endDrag();
  };

  const mouseMinDownHandle = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    isDown.min = true;
  };

  const getMinX = (x: number) => {
    if (x < -(Options.BUTTON_SIZE / 2)) {
      return -Options.BUTTON_SIZE / 2;
    }
    if (x > maxLeft) {
      return maxLeft;
    }
    return x;
  };

  const getMaxX = (x: number) => {
    if (x > widthBar - Options.BUTTON_SIZE / 2) {
      return widthBar - Options.BUTTON_SIZE / 2;
    }
    if (x < minLeft) {
      return minLeft;
    }
    return x;
  };

  const mouseMoveHandle = (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isDown.min) {
      const x = minLeft + evt.movementX;
      currentRange.min = Math.round(((x + Options.BUTTON_SIZE / 2) / widthBar * (range.max - range.min)) + range.min);
      setMinLeft(getMinX(x));
    }
    if (isDown.max) {
      const x = maxLeft + evt.movementX;
      currentRange.max = Math.round(((x + Options.BUTTON_SIZE / 2) / widthBar * (range.max - range.min)) + range.min);
      setMaxLeft(getMaxX(x));
    }
  };

  const mouseMaxDownHandle = (evt: React.MouseEvent) => {
    isDown.max = true;
  };

  const onInput = ({min, max}: RangeConstraint) => {
    currentRange.max = max;
    currentRange.min = min;
    setMinLeft(widthBar / (range.max - range.min) * (min - range.min) - Options.BUTTON_SIZE / 2);
    setMaxLeft(widthBar / (range.max - range.min) * (max - range.min) - Options.BUTTON_SIZE / 2);
  };

  const rangeClass = RangeClass[type as keyof typeof RangeClass];
  const controlClass = ControlClass[type as keyof typeof ControlClass];
  return (
    <div className={`${formClass}__block ${formClass}__block--${rangeClass}`} onMouseMove={mouseMoveHandle}
      onMouseUp={mouseUpHandle} onMouseLeave={mouseLeaveHandle}
    >
      <h4 className={`${formClass}__block-title`}>{RangeTitle[type as keyof typeof RangeTitle]}</h4>
      {type !== RangeTypes.rating && <InputsBlock {...{...currentRange, type, callback: onInput, range}}/>}
      <div className={`filter-${controlClass}`}>
        <div className={`filter-${controlClass}__scale`} ref={scale}>
          <div className={`filter-${controlClass}__bar`} ref={bar} style={{
            width: widthBar,
            backgroundColor: 'red'
          }}
          >
            <span className="visually-hidden">Полоса прокрутки</span>
          </div>
        </div>
        <div className={`filter-${controlClass}__control`}>
          <button className={`filter-${controlClass}__min-toggle`} ref={minButton}
            style={{ left: minLeft }}
            onMouseDown={mouseMinDownHandle}
          >
            <span className="visually-hidden">Минимальное значение</span>
          </button>
          {type === RangeTypes.rating && <span>{currentRange.min}</span>}
          {type !== RangeTypes.rating && <span style={{marginBottom: 10}}>{}</span>}
          <button className={`filter-${controlClass}__max-toggle`} ref={maxButton}
            style={{ left: maxLeft }}
            onMouseDown={mouseMaxDownHandle}
          >
            <span className="visually-hidden">Максимальное значение</span>
          </button>
          {type === RangeTypes.rating && <span>{currentRange.max}</span>}
        </div>
      </div>
    </div>
  );
}

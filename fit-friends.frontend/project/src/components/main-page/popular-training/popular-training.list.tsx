import PopularTrainingItem, {PopularTrainingItemProps} from './popular-training.item';
import SliderControls from '../slider-controls/slider-controls';
import {useEffect, useState} from 'react';
import {Direction} from '../../../enums';
import PlugPopular from '../plug/plug-popular';
import {sliderHelpers} from '../../../helpers/slider.helpers';

const IMAGE_WIDTH = 330;
const MARGIN_RIGHT = 20;
const SLIDER_VIEW_SIZE = 4;

type PopularTrainingListProps = {
  popularProps: PopularTrainingItemProps[];
}

export default function PopularTrainingList({popularProps}: PopularTrainingListProps): JSX.Element {
  const helpers = sliderHelpers(getElement, getPlug, popularProps, SLIDER_VIEW_SIZE);
  const [slideNumber, setSlideNumber] = useState(helpers.initSliderNumber());
  const [indexes] = useState(new Array(SLIDER_VIEW_SIZE + 2).fill(0).map((_, index) =>
    helpers.initIndex(index, popularProps.length
    )
  ));
  const [items,] = useState(helpers.initItems(indexes));

  function getElement(key: number, index: number) {
    return (<PopularTrainingItem {...popularProps[index]} key={key}/>);
  }

  function getPlug(key: number) {
    return (<PlugPopular key={key}/>);
  }

  useEffect(() => {
    helpers.effect(slideNumber, indexes, items, setSlideNumber);
  }, [slideNumber]);

  const onClickControl = (value: Direction) => {
    if (popularProps.length <= SLIDER_VIEW_SIZE) {
      return;
    }
    setSlideNumber(slideNumber + value);
  };

  return (
    <div className="popular-trainings__wrapper popular-trainings">
      <div className="popular-trainings__title-wrapper">
        <h2 className="popular-trainings__title">Популярные тренировки</h2>
        <button className="btn-flat popular-trainings__button" type="button"><span>Смотреть все</span>
          <svg width="14" height="10" aria-hidden="true">
            <use xlinkHref="#arrow-right"></use>
          </svg>
        </button>
        <SliderControls class={'popular-trainings'} outlined={false} callback={onClickControl}/>
      </div>
      <ul className="popular-trainings__list" style={{
        transform: `translateX(-${slideNumber * (IMAGE_WIDTH + MARGIN_RIGHT)}px)`,
        transition: 'transform 0.5s ease-in-out'
      }}
      >
        {items.map((item) => item.element)}
      </ul>
    </div>
  );
}

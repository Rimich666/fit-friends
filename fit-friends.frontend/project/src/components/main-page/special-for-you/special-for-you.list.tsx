import SliderControls from '../slider-controls/slider-controls';
import {useEffect, useState} from 'react';
import SpecialForYouItem, {SpecialForYouItemProps} from './special-for-you.item';
import PlugYou from '../plug/plug-you';
import {Direction} from '../../../enums';
import {sliderHelpers} from '../../../helpers/slider.helpers';

const SLIDER_VIEW_SIZE = 3;
const MARGIN_RIGHT = 20;
const IMAGE_WIDTH = 452;

type SpecialForYouListProps = {
  specialProps: SpecialForYouItemProps[];
}

export default function SpecialForYouList({specialProps}: SpecialForYouListProps): JSX.Element {
  const helpers = sliderHelpers(getElement, getPlug, specialProps, SLIDER_VIEW_SIZE);
  const [slideNumber, setSlideNumber] = useState(helpers.initSliderNumber());
  const [indexes] = useState(new Array(SLIDER_VIEW_SIZE + 2).fill(0).map((_, index) =>
    helpers.initIndex(index, specialProps.length)));
  const [items,] = useState(helpers.initItems(indexes));

  function getElement(key: number, index: number) {
    return (<SpecialForYouItem {...specialProps[index]} key={key}/>);
  }

  function getPlug(key: number) {
    return (<PlugYou key={key}/>);
  }

  useEffect(() => {
    helpers.effect(slideNumber, indexes, items, setSlideNumber);
  }, [slideNumber]);

  const onClickControl = (value: Direction) => {
    if (specialProps.length <= SLIDER_VIEW_SIZE) {
      return;
    }
    setSlideNumber(slideNumber + value);
  };

  return (
    <div className="special-for-you__wrapper special-for-you">
      <div className="special-for-you__title-wrapper">
        <h2 className="special-for-you__title">Специально подобрано для вас</h2>
        <SliderControls class={'special-for-you'} outlined={false} callback={onClickControl}/>
      </div>
      <ul className="special-for-you__list" style={{
        transform: `translateX(-${slideNumber * (IMAGE_WIDTH + MARGIN_RIGHT)}px)`,
        transition: 'transform 0.5s ease-in-out'
      }}
      >
        {items.map((item) => item.element)}
      </ul>
    </div>
  );
}

import {PopularTrainingItemProps} from '../main-page/popular-training/popular-training.item';
import SliderControls from '../main-page/slider-controls/slider-controls';
import {useEffect, useState} from 'react';
import {Direction} from '../../enums';
import PlugPopular from '../main-page/plug/plug-popular';
import {sliderHelpers} from '../../helpers/slider.helpers';
import {useNavigate} from 'react-router-dom';
import {AppRoute} from '../../app-route';
import Card from '../training-card-mini/card';
import {ComponentVariant} from '../../component-variant';
import {useAppSelector} from "../../hooks";
import {selectTrainingsForCoachCard} from "../../store/training-process/training.selectors";

const IMAGE_WIDTH = 330;
const MARGIN_RIGHT = 20;
const SLIDER_VIEW_SIZE = 4;

type TrainingCardSliderProps = {
  trainingProps: PopularTrainingItemProps[];
  variant: ComponentVariant;
}

export default function TrainingCardSlider({trainingProps, variant}: TrainingCardSliderProps): JSX.Element {
  const helpers = sliderHelpers(getElement, getPlug, trainingProps, SLIDER_VIEW_SIZE);
  const [slideNumber, setSlideNumber] = useState(helpers.initSliderNumber());
  const [indexes] = useState(new Array(SLIDER_VIEW_SIZE + 2).fill(0).map((_, index) =>
    helpers.initIndex(index, trainingProps.length
    )
  ));

  const navigate = useNavigate();
  const [items,] = useState(helpers.initItems(indexes));

  function getElement(key: number, index: number) {
    return (<Card {...{...trainingProps[index], variant: variant}} key={key}/>);
  }

  function getPlug(key: number) {
    return (<PlugPopular key={key}/>);
  }

  useEffect(() => {
    helpers.effect(slideNumber, indexes, items, setSlideNumber);
  }, [slideNumber]);

  const onClickControl = (value: Direction) => {
    if (trainingProps.length <= SLIDER_VIEW_SIZE) {
      return;
    }
    setSlideNumber(slideNumber + value);
  };

  const clickAllHandle = () => {
    navigate(AppRoute.TrainingCatalog);
  };

  return (
    <>
      {variant === ComponentVariant.popularTraining &&
      <div className="popular-trainings__wrapper popular-trainings">
        <div className="popular-trainings__title-wrapper">
          <h2 className="popular-trainings__title">Популярные тренировки</h2>
          <button className="btn-flat popular-trainings__button" type="button" onClick={clickAllHandle}>
            <span>Смотреть все</span>
            <svg width="14" height="10" aria-hidden="true">
              <use xlinkHref="#arrow-right"></use>
            </svg>
          </button>
          <SliderControls class={'popular-trainings'} outlined={false} callback={onClickControl} variant={variant}/>
        </div>
        <ul className="popular-trainings__list" style={{
          transform: `translateX(-${slideNumber * (IMAGE_WIDTH + MARGIN_RIGHT)}px)`,
          transition: 'transform 0.5s ease-in-out'
        }}
        >
          {items.map((item) => item.element)}
        </ul>
      </div>}
      {
        variant === ComponentVariant.userCard &&
          <>
            <div className="user-card-coach__training-head">
              <h2 className="user-card-coach__training-title">Тренировки</h2>
              <SliderControls class={'popular-trainings'} outlined={false} callback={onClickControl} variant={variant}/>
            </div>
            <ul className="user-card-coach__training-list" style={{
              transform: `translateX(-${slideNumber * (IMAGE_WIDTH + MARGIN_RIGHT)}px)`,
              transition: 'transform 0.5s ease-in-out'
            }}
            >
              {items.map((item) => item.element)}
            </ul>
          </>
      }
    </>
  );
}

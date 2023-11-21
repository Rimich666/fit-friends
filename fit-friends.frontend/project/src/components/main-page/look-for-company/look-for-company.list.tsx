import UserCard, {UserCardProps} from '../../user-card-mini/user-card';
import SliderControls from '../slider-controls/slider-controls';
import {sliderHelpers} from '../../../helpers/slider.helpers';
import {useEffect, useState} from 'react';
import {Direction} from '../../../enums';
import PlugCompany from '../plug/plug-company';
import {ComponentVariant} from '../../../component-variant';
import {AppRoute} from '../../../app-route';
import {useNavigate} from 'react-router-dom';

const LI_WIDTH = 334;
const MARGIN_RIGHT = 20;
const SLIDER_VIEW_SIZE = 4;

type LookForCompanyListProps = {
  propsLook: UserCardProps[];
}

export default function LookForCompanyList({propsLook}: LookForCompanyListProps): JSX.Element {
  const helpers = sliderHelpers(getElement, getPlug, propsLook, SLIDER_VIEW_SIZE);
  const [slideNumber, setSlideNumber] = useState(helpers.initSliderNumber());
  const [indexes] = useState(new Array(SLIDER_VIEW_SIZE + 2).fill(0).map((_, index) =>
    helpers.initIndex(index, propsLook.length)));
  const [items,] = useState(helpers.initItems(indexes));
  const navigate = useNavigate();

  function getElement(key: number, index: number) {
    return (<UserCard {...{...propsLook[index], dark: true, variant: ComponentVariant.lookForCompany}} key={key}/>);
  }

  function getPlug(key: number) {
    return (<PlugCompany key={key}/>);
  }

  useEffect(() => {
    helpers.effect(slideNumber, indexes, items, setSlideNumber);
  }, [slideNumber]);

  const onClickControl = (value: Direction) => {
    if (propsLook.length <= SLIDER_VIEW_SIZE) {
      return;
    }
    setSlideNumber(slideNumber + value);
  };

  const clickAllHandle = () => {
    navigate(AppRoute.UserCatalog);
  };

  return (
    <div className="look-for-company__wrapper special-for-you">
      <div className="look-for-company__title-wrapper">
        <h2 className="look-for-company__title">Ищут компанию для тренировки</h2>
        <button className="btn-flat btn-flat--light look-for-company__button" type="button" onClick={clickAllHandle}>
          <span>Смотреть все</span>
          <svg width="14" height="10" aria-hidden="true">
            <use xlinkHref="#arrow-right"/>
          </svg>
        </button>
        <SliderControls class={'look-for-company'} outlined callback={onClickControl}
          variant={ComponentVariant.lookForCompany}
        />
      </div>
      <ul className="look-for-company__list" style={{
        transform: `translateX(-${slideNumber * (LI_WIDTH + MARGIN_RIGHT)}px)`,
        transition: 'transform 0.5s ease-in-out'
      }}
      >
        {items.map((item) => item.element)}
      </ul>
    </div>
  );
}

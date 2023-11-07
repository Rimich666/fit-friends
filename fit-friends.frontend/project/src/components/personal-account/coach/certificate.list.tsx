import SliderControls from '../../main-page/slider-controls/slider-controls';
import {sliderHelpers} from '../../../helpers/slider.helpers';
import React, {useEffect, useState} from 'react';
import {Direction} from '../../../enums';
import CertificateItem, {CertificateItemProps} from './certificate.item';

const SLIDER_VIEW_SIZE = 3;
const MARGIN_RIGHT = 20;
const LI_WIDTH = 334;

type CertificateListProps = {
  certificateProps: CertificateItemProps[];
}

export default function CertificateList({certificateProps}: CertificateListProps): JSX.Element {
  const helpers = sliderHelpers(getElement, getPlug, certificateProps, SLIDER_VIEW_SIZE);
  const [slideNumber, setSlideNumber] = useState(helpers.initSliderNumber());
  const [indexes] = useState(new Array(SLIDER_VIEW_SIZE + 2).fill(0).map((_, index) =>
    helpers.initIndex(index, certificateProps.length)));
  const [items,] = useState(helpers.initItems(indexes));

  function getElement(key: number, index: number) {
    return (<CertificateItem {...certificateProps[index]} key={key}/>);
  }

  function getPlug(key: number) {
    return (<div/>);
  }

  useEffect(() => {
    helpers.effect(slideNumber, indexes, items, setSlideNumber);
  }, [slideNumber]);

  const onClickControl = (value: Direction) => {
    if (certificateProps.length <= SLIDER_VIEW_SIZE) {
      return;
    }
    setSlideNumber(slideNumber + value);
  };

  return (
    <div className="special-for-you">
      <div className="personal-account-coach__label-wrapper" style={{maxWidth: '1042px'}}>
        <h2 className="personal-account-coach__label">Дипломы и сертификаты</h2>
        <button className="btn-flat btn-flat--underlined personal-account-coach__button" type="button">
          <svg width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-import"/>
          </svg>
          <span>Загрузить</span>
        </button>
        <SliderControls class={'personal-account-coach'} outlined={false} callback={onClickControl}/>
      </div>
      <ul className="personal-account-coach__list" style={{
        transform: `translateX(-${slideNumber * (LI_WIDTH + MARGIN_RIGHT)}px)`,
        transition: 'transform 0.5s ease-in-out',
        maxWidth: '1396px'
      }}
      >
        {items.map((item) => item.element)}
      </ul>
    </div>
  );
}

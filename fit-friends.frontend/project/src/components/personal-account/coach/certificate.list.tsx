import SliderControls from '../../main-page/slider-controls/slider-controls';
import {sliderHelpers} from '../../../helpers/slider.helpers';
import React, {useEffect, useState} from 'react';
import {Direction} from '../../../enums';
import CertificateItem from './certificate.item';
import {ComponentVariant} from '../../../component-variant';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {selectCertificatesLength} from '../../../store/register-process/register-selectors';
import {FileContent} from 'use-file-picker/types';
import {Accept} from '../../../settings';
import useAppFilesPicker from '../../../hooks/use-app-files-picker';
import {addCertificates, deleteCertificates} from '../../../store/api-actions/certificate.actions';
import {SpinnerCircular} from 'spinners-react';


const SLIDER_VIEW_SIZE = 3;
const MARGIN_RIGHT = 20;
const LI_WIDTH = 334;


export default function CertificateList(): JSX.Element {
  const dispatch = useAppDispatch();

  const onDeleteItem = (id: string) => {
    dispatch(deleteCertificates(id));
    setIsDelete(true);
  };

  const selectFilesHandle = (plainFiles: File[], files: FileContent<string>[]) => {
    dispatch(addCertificates(plainFiles));
  };
  const openFilePicker = useAppFilesPicker(selectFilesHandle, Accept.certificate);

  const clickLoadHandle = () => {
    openFilePicker();
  };

  const length = useAppSelector(selectCertificatesLength);

  useEffect(() => {
    setIndexes(indexes.map((_, index) => helpers.initIndex(index, length)));
    setItems(helpers.initItems(indexes));
    setSlideNumber(helpers.initSliderNumber());
    setIsDelete(false);
  }, [length]);

  const helpers = sliderHelpers(getElement, getPlug, length, SLIDER_VIEW_SIZE);
  const [slideNumber, setSlideNumber] = useState(helpers.initSliderNumber());
  const [indexes, setIndexes] = useState(new Array(SLIDER_VIEW_SIZE + 2).fill(0).map((_, index) =>
    helpers.initIndex(index, length)));
  const [items, setItems] = useState(helpers.initItems(indexes));
  const [isDelete, setIsDelete] = useState(false);

  function getElement(key: number, index: number) {
    return (
      <CertificateItem {...{
        index,
        deleteHandle: onDeleteItem}} key={key}
      />);
  }

  function getPlug(key: number) {
    return (<div/>);
  }

  useEffect(() => {
    helpers.effect(slideNumber, indexes, items, setSlideNumber);
  }, [slideNumber]);

  const onClickControl = (value: Direction) => {
    if (length <= SLIDER_VIEW_SIZE) {
      return;
    }
    setSlideNumber(slideNumber + value);
  };

  console.log(isDelete, length, indexes);
  if (isDelete) {
    return <SpinnerCircular/>;
  }

  return (
    <div className="special-for-you">
      <div className="personal-account-coach__label-wrapper" style={{maxWidth: '1042px'}}>
        <h2 className="personal-account-coach__label">Дипломы и сертификаты</h2>
        <button className="btn-flat btn-flat--underlined personal-account-coach__button" type="button"
          onClick={clickLoadHandle}
        >
          <svg width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-import"/>
          </svg>
          <span>Загрузить</span>
        </button>
        <SliderControls class={'personal-account-coach'} outlined={false} callback={onClickControl}
          variant={ComponentVariant.popularTraining}
        />
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

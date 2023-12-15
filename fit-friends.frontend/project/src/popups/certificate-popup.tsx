import React from 'react';
import {Direction} from '../enums';

type CertificatePopupProps = {
  callback: () => void;
}

export default function CertificatePopup(props: CertificatePopupProps): JSX.Element {
  const isPdf = true;
  const clickHandle = () => {
    props.callback();
  };
  const src = '/img/content/certificates-and-diplomas/certificate-3.jpg';
  const alt = '';
  return (
    <div className="popup__content popup__content--certificates">
      <div className="user-card-coach__training-bts">
        <button className="btn-icon user-card-coach__training-btn" type="button" aria-label="back"
          value={Direction.back} onClick={clickHandle}
        >
          <svg width="14" height="10" aria-hidden="true">
            <use xlinkHref="#arrow-left"/>
          </svg>
        </button>
        <button className="btn-icon user-card-coach__training-btn" type="button" aria-label="next"
          value={Direction.forward} onClick={clickHandle}
        >
          <svg width="14" height="10" aria-hidden="true">
            <use xlinkHref="#arrow-right"/>
          </svg>
        </button>
      </div>
      <ul className="popup__slider-list">
        <li className="popup__slide popup__slide--current">
          <div className="popup__slide-img">
            <picture>
              {isPdf && <embed src={`${src}#toolbar=0&navpanes=0&scrollbar=0`} width="294" height="360"/>}
              {!isPdf && <img src={src} width="294" height="360" alt={alt}/>}
            </picture>
          </div>
        </li>
      </ul>
    </div>
  );
}

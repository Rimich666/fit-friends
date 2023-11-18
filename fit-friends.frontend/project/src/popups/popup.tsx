import BuyPopup from "./buy-popup";
import React from "react";
import FeedbackPopup from "./feedback-popup";

export enum PopupType {
  buy = 'buy',
  feedback = 'feedback',
  map = 'map',
}

type PopupProps = {
  popup: PopupType;
  title: string;
  location?: string;
  onClose: () => void;
}

export default function Popup({popup, title, location, onClose}: PopupProps): JSX.Element {
  return (
    <div className={`popup-form popup-form--${popup}`}>
      <section className="popup">
        <div className={`popup__wrapper${popup === PopupType.map ? ' popup__wrapper--map' : ''}`}>
          <div className={`popup-head${popup === PopupType.map ? ' popup-head--address' : ''}`}>
            <h2 className="popup-head__header">{title}</h2>
            {popup === PopupType.map &&
              <p className="popup-head__address">
                <svg className="popup-head__icon-location" width="12" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-location"/>
                </svg>
                <span>{location}</span>
              </p>}
            <button className="btn-icon btn-icon--outlined btn-icon--big" type="button" aria-label="close" onClick={onClose}>
              <svg width="20" height="20" aria-hidden="true">
                <use xlinkHref="#icon-cross"/>
              </svg>
            </button>
          </div>
          {popup === PopupType.buy && <BuyPopup onClose={onClose}/>}
          {popup === PopupType.feedback && <FeedbackPopup onClose={onClose}/>}
        </div>
      </section>
    </div>
  );
}

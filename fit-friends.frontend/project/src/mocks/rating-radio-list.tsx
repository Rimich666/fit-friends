export default function RatingRadioList(): JSX.Element {
  return (
    <ul className="popup__rate-list">
      <li className="popup__rate-item">
        <div className="popup__rate-item-wrap">
          <label>
            <input type="radio" name="оценка тренировки" aria-label="оценка 1." value="1"/>
            <span className="popup__rate-number">1</span>
          </label>
        </div>
      </li>
      <li className="popup__rate-item">
        <div className="popup__rate-item-wrap">
          <label>
            <input type="radio" name="оценка тренировки" aria-label="оценка 2." value="2"/>
            <span className="popup__rate-number">2</span>
          </label>
        </div>
      </li>
      <li className="popup__rate-item">
        <div className="popup__rate-item-wrap">
          <label>
            <input type="radio" name="оценка тренировки" aria-label="оценка 3." value="3"/>
            <span className="popup__rate-number">3</span>
          </label>
        </div>
      </li>
      <li className="popup__rate-item">
        <div className="popup__rate-item-wrap">
          <label>
            <input type="radio" name="оценка тренировки" aria-label="оценка 4." value="4"/>
            <span className="popup__rate-number">4</span>
          </label>
        </div>
      </li>
      <li className="popup__rate-item">
        <div className="popup__rate-item-wrap">
          <label>
            <input type="radio" name="оценка тренировки" aria-label="оценка 5." value="5"/>
            <span className="popup__rate-number">5</span>
          </label>
        </div>
      </li>
    </ul>
  );
}

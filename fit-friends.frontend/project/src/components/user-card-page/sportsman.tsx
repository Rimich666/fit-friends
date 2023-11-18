export default function Sportsman(): JSX.Element {

  return (

    <div>
      <div className="user-card__content">
        <div className="user-card__head">
          <h2 className="user-card__title">Катерина</h2>
        </div>
        <div className="user-card__label">
          <a href="">
            <svg className="user-card-coach__icon-location" width="12" height="14" aria-hidden="true">
              <use xlinkHref="#icon-location"/>
            </svg>
            <span>Невский проспект</span>
          </a>
        </div>
        <div className="user-card__status"><span>Готов к тренировке</span></div>
        <div className="user-card__text">
          <p>Привет! Я&nbsp;Катерина и&nbsp;мне 27 лет. Обожаю спорт и&nbsp;все, что с&nbsp;ним связанно. Регулярно хожу на&nbsp;тренировки по&nbsp;кроссфиту, также занимаюсь йогой, рястяжкой и&nbsp;пилатесом.</p>
          <p>Занимаюсь как с&nbsp;тренером индивидуально, так и&nbsp;на&nbsp;групповых занятиях. Люблю соревнования и&nbsp;челленджи, так что присоединяйтесь, давайте объединяться и&nbsp;заниматься вместе!&#41;</p>
        </div>
        <ul className="user-card__hashtag-list">
          <li className="user-card__hashtag-item">
            <div className="hashtag"><span>#йога</span></div>
          </li>
          <li className="user-card__hashtag-item">
            <div className="hashtag"><span>#кроссфит</span></div>
          </li>
          <li className="user-card__hashtag-item">
            <div className="hashtag"><span>#пилатес</span></div>
          </li>
          <li className="user-card__hashtag-item">
            <div className="hashtag"><span>#любитель</span></div>
          </li>
        </ul>
        <button className="btn user-card__btn" type="button">Добавить в друзья</button>
      </div>
      <div className="user-card__gallary">
        <ul className="user-card__gallary-list">
          <li className="user-card__gallary-item">
            <img src="/img/content/user-card-photo1.jpg" width="334" height="573" alt="photo1"/>
          </li>
          <li className="user-card__gallary-item">
            <img src="/img/content/user-card-photo2.jpg" width="334" height="573" alt="photo2"/>
          </li>
        </ul>
      </div>
    </div>

  );
}

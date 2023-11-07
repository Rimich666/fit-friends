
export default function PlugPopular(): JSX.Element {
  return (
    <li className="popular-trainings__item">
      <div className="thumbnail-training">
        <div className="thumbnail-training__inner">
          <div className="thumbnail-training__image">
            <picture>
              <img src="/img/content/thumbnails/nearest-gym-01.jpg" width={330} height={190} alt=""/>
            </picture>
          </div>
          <h3 className="thumbnail-training__title">Скоро здесь появится что - то полезное</h3>
        </div>
      </div>
    </li>
  );
}

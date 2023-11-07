export default function PlugYou(): JSX.Element {
  return (
    <li className="special-for-you__item">
      <div className="thumbnail-preview">
        <div className="thumbnail-preview__image">
          <picture>
            <img src="/img/content/thumbnails/nearest-gym-01.jpg" width={452} height={191} alt=""/>
          </picture>
        </div>
        <div className="thumbnail-preview__inner">
          <h3 className="thumbnail-preview__title">Скоро здесь появится что - то полезное</h3>
        </div>
      </div>
    </li>
  );
}

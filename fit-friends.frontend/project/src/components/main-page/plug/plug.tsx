type PluProps = {
  text?: string;
}

export default function Plug(props: PluProps): JSX.Element {
  const text = props.text || 'Скоро здесь появится что - то полезное';
  return (
    <div className="thumbnail-spec-gym">
      <div className="thumbnail-spec-gym__image">
        <picture>
          <source type="image/webp"
            srcSet="/img/content/thumbnails/nearest-gym-01.webp, /img/content/thumbnails/nearest-gym-01@2x.webp 2x"
          />
          <img src="/img/content/thumbnails/nearest-gym-01.jpg"
            srcSet="/img/content/thumbnails/nearest-gym-01@2x.jpg 2x" width={330} height={190} alt=""
          />
        </picture>
      </div>
      <div className="thumbnail-spec-gym__header">
        <h3 className="thumbnail-spec-gym__title">{text}</h3>
      </div>
    </div>
  );
}

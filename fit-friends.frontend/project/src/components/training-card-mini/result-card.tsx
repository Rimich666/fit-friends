type ResultCardProps = {
  title: string;
  icon: string;
  value: number;
}

export default function ResultCard({title, icon, value}: ResultCardProps): JSX.Element {
  return (
    <div className="thumbnail-training__total-info-card">
      <svg width="32" height="32" aria-hidden="true">
        <use xlinkHref={icon}></use>
      </svg>
      <p className="thumbnail-training__total-info-value">{value}</p>
      <p className="thumbnail-training__total-info-text">{title}</p>
    </div>
  );
}

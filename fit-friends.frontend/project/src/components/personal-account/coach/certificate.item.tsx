import {useState} from 'react';

export type CertificateItemProps = {
  src: string;
  alt?: string;
  index: number;
  deleteHandle: (index: number) => void;
  changeHandle: (index: number) => void;
  onSave: (index: number) => void;
}

export default function CertificateItem({src, ...props}: CertificateItemProps): JSX.Element {
  const [isEdit, setIsEdit] = useState(false);
  const alt = props.alt ? props.alt : '';
  const isPdf = src.endsWith('.pdf');

  const saveHandle = () => {
    props.onSave(props.index);
    setIsEdit(false);
  };

  return (
    <li className="personal-account-coach__item">
      <div className={`certificate-card ${isEdit ? 'certificate-card--edit' : ''}`}>
        <div className="certificate-card__image">
          <picture>
            {isPdf && <embed src={`${src}#toolbar=0&navpanes=0&scrollbar=0`} width="294" height="360"/>}
            {!isPdf && <img src={src} width="294" height="360" alt={alt}/>}
          </picture>
        </div>
        <div className="certificate-card__buttons">
          <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit"
            type="button" onClick={() => setIsEdit(true)}
          >
            <svg width="12" height="12" aria-hidden="true">
              <use xlinkHref="#icon-edit"/>
            </svg>
            <span>Изменить</span>
          </button>
          <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save"
            type="button" onClick={saveHandle}
          >
            <svg width="12" height="12" aria-hidden="true">
              <use xlinkHref="#icon-edit"/>
            </svg>
            <span>Сохранить</span>
          </button>
          <div className="certificate-card__controls">
            <button className="btn-icon certificate-card__control" type="button" aria-label="next"
              onClick={() => {props.changeHandle(props.index);}}
            >
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-change"/>
              </svg>
            </button>
            <button className="btn-icon certificate-card__control" type="button" aria-label="next"
              onClick={() => {props.deleteHandle(props.index);}}
            >
              <svg width="14" height="16" aria-hidden="true">
                <use xlinkHref="#icon-trash"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

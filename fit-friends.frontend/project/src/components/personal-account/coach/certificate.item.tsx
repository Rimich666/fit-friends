import {useAppDispatch, useAppSelector} from '../../../hooks';
import {makeSelectCertificate} from '../../../store/register-process/register-selectors';
import {FileContent} from 'use-file-picker/types';
import useAppFilePicker from '../../../hooks/use-app-file-picker';
import {Accept} from '../../../settings';
import {
  dropIsEditCertificate,
  setCertificate,
  setIsEditCertificate
} from '../../../store/register-process/register-process';
import {saveChangeCertificate} from '../../../store/api-actions/certificate.actions';

export type CertificateItemProps = {
  index: number;
  deleteHandle: (id: string) => void;
}

export default function CertificateItem(props: CertificateItemProps): JSX.Element {
  const alt = '';
  const certificate = useAppSelector((state) => makeSelectCertificate(state, props.index));
  const dispatch = useAppDispatch();


  const src = certificate.path;
  const isPdf = certificate.ext === '.pdf' || certificate.ext === 'application/pdf';
  const isEdit = certificate.isEdit;
  const selectFilesHandle = (plainFile: File, file: FileContent<string>) => {
    dispatch(setCertificate({
      index: props.index,
      path: URL.createObjectURL(plainFile),
      ext: plainFile.type,
      file: plainFile
    }));
  };
  const openFilePicker = useAppFilePicker(selectFilesHandle, Accept.certificate);

  const clickLoadHandle = () => {
    openFilePicker();
  };

  const saveHandle = () => {
    if (!certificate.file) {
      dispatch(dropIsEditCertificate(props.index));
      return;
    }
    URL.revokeObjectURL(certificate.path);
    dispatch(saveChangeCertificate(certificate));
  };

  const clickEditHandle = () => {
    dispatch(setIsEditCertificate(props.index));
  };

  const deleteHandle = () => {
    props.deleteHandle(certificate.id as string);
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
            type="button" onClick={clickEditHandle}
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
              onClick={clickLoadHandle}
            >
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-change"/>
              </svg>
            </button>
            <button className="btn-icon certificate-card__control" type="button" aria-label="next"
              onClick={deleteHandle}
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

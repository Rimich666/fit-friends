import FileLoad from '../file-load/file-load';

type CertificateProps = {
  errorMessage: string;
  callback: (file: File[]) => void;
}

export default function Certificate({errorMessage, callback}: CertificateProps): JSX.Element {
  return (
    <div className="questionnaire-coach__block"><span className="questionnaire-coach__legend">Ваши дипломы и сертификаты</span>
      <FileLoad
        {...{
          accept: '.pdf, .jpg, .png',
          class: 'questionnaire-coach__drag-and-drop',
          label: 'Загрузите сюда файлы формата PDF, JPG или PNG',
          errorMessage,
          callback,
          icon: '#icon-import',
          multiple: true
        }}
      />
    </div>
  );
}

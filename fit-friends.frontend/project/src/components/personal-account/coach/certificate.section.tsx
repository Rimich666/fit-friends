import CertificateList from './certificate.list';
import {certificates} from './certificates';

export default function CertificateSection(): JSX.Element {
  return (
    <div className="personal-account-coach__additional-info">
      <CertificateList certificateProps={certificates}/>
    </div>
  );
}

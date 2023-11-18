import CertificateList from './certificate.list';

type CertificateSectionProps = {
  certificates: string[];
}

export default function CertificateSection({certificates}: CertificateSectionProps): JSX.Element {
  return (
    <div className="personal-account-coach__additional-info">
      <CertificateList certificates={certificates}/>
    </div>
  );
}

import {coachLinks, link} from '../link/links';
import PersonalAccountLink from '../link/personal-account.link';
import Plug from '../../main-page/plug/plug';
import CertificateSection from './certificate.section';

type PersonalAccountCoachProps = {
  certificates: string[];
}

export default function PersonalAccountCoach({certificates}: PersonalAccountCoachProps): JSX.Element {
  return (
    <div className="personal-account-coach">
      <div className="personal-account-coach__navigation">
        {coachLinks.map((key) => (
          <PersonalAccountLink {...link[key]} key={key}/>
        ))}
        <div className="personal-account-coach__calendar">
          <Plug text={'Скоро тут будет интересно'}/>
        </div>
      </div>
      <CertificateSection certificates={certificates}/>
    </div>
  );
}

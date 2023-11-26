import {coachLinks, link} from '../link/links';
import PersonalAccountLink from '../link/personal-account.link';
import Plug from '../../main-page/plug/plug';
import CertificateSection from './certificate.section';
import {useDispatch} from 'react-redux';
import {setBack} from '../../../store/back-process/back.process';
import {AppRoute} from '../../../app-route';

export default function PersonalAccountCoach(): JSX.Element {
  useDispatch()(setBack(AppRoute.Coach));
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
      <CertificateSection/>
    </div>
  );
}

import Plug from '../../main-page/plug/plug';
import {link, userLinks} from '../link/links';
import PersonalAccountLink from '../link/personal-account.link';

export default function PersonalAccountUser(): JSX.Element {
  return (
    <div className="personal-account-user">
      <div className="personal-account-user__schedule">
        <form action="#" method="get">
          <div className="personal-account-user__form">
            <div className="personal-account-user__input">
              <label>
                <span className="personal-account-user__label">План на день, ккал</span>
                <input type="text" name="schedule-for-the-day" value="3 300"/>
              </label>
            </div>
            <div className="personal-account-user__input">
              <label>
                <span className="personal-account-user__label">План на неделю, ккал</span>
                <input type="text" name="schedule-for-the-week" value="23 100"/>
              </label>
            </div>
          </div>
        </form>
      </div>
      <div className="personal-account-user__additional-info">
        {userLinks.map((key) => (
          <PersonalAccountLink {...link[key]} key={key}/>
        ))}
        <Plug/>
      </div>
    </div>
  );
}

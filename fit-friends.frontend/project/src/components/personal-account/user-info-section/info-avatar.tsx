import {UserInfoMode} from '../constants';

type InfoAvatarProps = {
  mode: UserInfoMode;
  src: string;
}

export default function InfoAvatar({mode, src}: InfoAvatarProps): JSX.Element {
  return (
    <div className={`user-info${mode}__header`}>
      <div className="input-load-avatar">
        <label>
          <input className="visually-hidden" type="file" name="user-photo-1" accept="image/png, image/jpeg"/>
          <span className="input-load-avatar__avatar">
            <img src={src} width="98" height="98" alt="user photo"/>
          </span>
        </label>
      </div>
    </div>
  );
}

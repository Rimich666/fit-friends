import {UserInfoMode} from '../constants';
import React, {useEffect, useState} from 'react';
import {FileContent} from 'use-file-picker/types';
import useAppFilePicker from '../../../hooks/use-app-file-picker';
import {Accept} from '../../../settings';

type InfoAvatarProps = {
  mode: UserInfoMode;
  url: string;
  callback: (file: File) => void;
}

export default function InfoAvatar({mode, url, callback}: InfoAvatarProps): JSX.Element {
  const [src, setSrc] = useState(url);

  useEffect(() => {
    setSrc(url);
  }, [url]);

  const selectFileHandle = (plainFile: File, file: FileContent<string> ) => {
    setSrc(file.content);
    callback(plainFile);
  };
  const openFilePicker = useAppFilePicker(selectFileHandle, Accept.avatar);

  const clickHandle = () => {
    if (mode === UserInfoMode.edit) {
      openFilePicker();
    }
  };

  return (
    <div className={`user-info${mode}__header`}>
      <div className="input-load-avatar">
        <label>
          <input className="visually-hidden" type="file" name="user-photo-1" accept="image/png, image/jpeg"
            onClick={(event) => {event.preventDefault();}}
          />
          <span className="input-load-avatar__avatar" onClick={clickHandle}>
            <img src={src} width="98" height="98" alt="user photo"/>
          </span>
        </label>
      </div>
    </div>
  );
}

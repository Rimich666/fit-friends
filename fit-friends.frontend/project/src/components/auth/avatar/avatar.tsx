import React, {useEffect, useState} from 'react';
import {FileContent} from 'use-file-picker/types';
import useAppFilePicker from '../../../hooks/use-app-file-picker';
import {Accept} from '../../../settings';

type AvatarProps = {
  callback: (file: File) => void;
  errorMessage: string;
}

export default function Avatar({callback, errorMessage}: AvatarProps): JSX.Element {
  const [image, setImage] = useState(null as unknown as FileContent<string>);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(errorMessage.length > 0);
  }, [errorMessage]);

  const selectFileHandle = (plainFile: File, file: FileContent<string> ) => {
    setImage(file);
    setIsError(false);
    callback(plainFile);
  };
  const openFilePicker = useAppFilePicker(selectFileHandle, Accept.avatar);

  const clickHandle = () => {
    openFilePicker();
  };

  return (
    <div className="sign-up__load-photo">
      <div className="input-load-avatar">
        <label>
          <input className="visually-hidden" type="file" accept="image/png, image/jpeg" name={image ? image.name : ''}
            onClick={(event) => {event.preventDefault();}}
          />
          <span className={`input-load-avatar__${image ? 'avatar' : 'btn'}`} onClick={clickHandle}>
            {image ?
              <img src={image.content} width="98" height="98" alt="user photo"/> :
              <svg width="20" height="20" aria-hidden="true">
                <use xlinkHref="#icon-import"></use>
              </svg>}
          </span>
        </label>
      </div>
      <div className={`sign-up__description ${isError ? 'custom-input--error' : ''}`}>
        <h2 className="sign-up__legend">Загрузите фото профиля</h2>
        <span className="sign-up__text">JPG, PNG, оптимальный размер 100&times;100&nbsp;px</span>
        <span className="custom-input__error">{errorMessage}</span>
      </div>
    </div>
  );
}

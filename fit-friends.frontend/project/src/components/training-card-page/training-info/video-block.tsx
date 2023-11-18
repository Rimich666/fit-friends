import {Role} from '../../../enums';
import React, {useState} from 'react';
import {FileContent} from 'use-file-picker/types';
import useAppFilePicker from '../../../hooks/use-app-file-picker';
import {Accept} from '../../../settings';
import {makeUpdateTrainingCardPayload} from '../../../helpers/make-update-training-payload';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {subBalance, updateTrainingCard} from '../../../store/api-actions/api-actions';
import {selectBalance} from '../../../store/balance-process/balance.selectors';

type VideoBlockProps = {
  role: Role;
  video: string;
  img: string;
  id: number;
}

export default function VideoBlock({role, video, id, img}: VideoBlockProps): JSX.Element {
  const [isPlayed, setIsPlayed] = useState(false);
  const [src, setSrc] = useState(video);
  const [newFile, setNewFile] = useState(undefined as unknown as File);
  const [isStarted, setIsStarted] = useState(false);
  const dispatch = useAppDispatch();

  const count = useAppSelector(selectBalance);
  const saveVideoHandle = () => {
    if (newFile) {
      dispatch(updateTrainingCard(makeUpdateTrainingCardPayload({video: newFile, id, training: {}})));
      setNewFile(undefined as unknown as File);
    }
  };

  const selectFileHandle = (plainFile: File, file: FileContent<string> ) => {
    setSrc(file.content);
    setNewFile(plainFile);
  };
  const openFilePicker = useAppFilePicker(selectFileHandle, Accept.avatar);

  const clickHandle = (evt: React.FormEvent<HTMLInputElement>) => {
    evt.preventDefault();
    openFilePicker();
  };

  const onStarted = () => {
    dispatch(subBalance({count: 1, trainingId: id}));
    setIsStarted(true);
  };

  const onEnded = () => {
    setIsPlayed(false);
    setIsStarted(false);
  };

  return (
    <div className="training-video">
      <h2 className="training-video__title">Видео</h2>
      {src !== '' && (
        <div className="training-video__video">
          <div className="training-video__thumbnail">
            <picture>
              {isPlayed &&
                <video width="922" height={566} autoPlay controls poster={img}
                  onEnded={onEnded}
                >
                  <source src={src} type={'video/mp4'}/>
                </video>}
              {!isPlayed && <img src={img} width="922" height={566} alt="Обложка видео"/>}
            </picture>
          </div>
          {!isPlayed &&
          <button className="training-video__play-button btn-reset" onClick={() => {setIsPlayed(true);}}
            disabled={!isStarted}
          >
            <svg width="18" height="30" aria-hidden="true">
              <use xlinkHref="#icon-arrow"/>
            </svg>
          </button>}
        </div>)}
      {(role === Role.coach && src === '') && (
        <div className="training-video__drop-files" style={{display: 'flex'}}>
          <form action="#" method="post">
            <div className="training-video__form-wrapper">
              <div className="drag-and-drop">
                <label>
                  <span className="drag-and-drop__label" tabIndex={0}>Загрузите сюда файлы формата MOV, AVI или MP4
                    <svg width="20" height="20" aria-hidden="true">
                      <use xlinkHref="#icon-import-video"/>
                    </svg>
                  </span>
                  <input type="file" name="import" tabIndex={-1} accept=".mov, .avi, .mp4"
                    onClick={clickHandle}
                  />
                </label>
              </div>
            </div>
          </form>
        </div>
      )}

      <div className={`training-video__buttons-wrapper${isStarted ? ' training-video--stop' : ''}`}>
        {(role === Role.sportsman) && (
          <button className="btn training-video__button training-video__button--start" type="button"
            disabled={count === 0} onClick={onStarted}
          >Приступить
          </button>
        )}
        {role === Role.coach && (
          <div className="training-video__edit-buttons">
            <button className="btn" type="button" onClick={saveVideoHandle} disabled={!newFile}>Сохранить</button>
            <button className="btn btn--outlined" type="button" onClick={() => {setSrc('');}}>Удалить</button>
          </div>
        )}
        {(role === Role.sportsman) && (
          <button className="btn training-video__button training-video__button--stop" type="button" onClick={onEnded}>Закончить</button>
        )}
      </div>
    </div>
  );
}

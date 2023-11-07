import React, {useEffect, useState} from 'react';

type FileLoadProps = {
  errorMessage: string;
  class: string;
  label: string;
  accept: string;
  callback: (file: File) => void;
}

export default function FileLoad({errorMessage, ...props}: FileLoadProps): JSX.Element {
  const [fileName, setFileName] = useState(props.label);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(errorMessage.length > 0);
  }, [errorMessage]);

  const inputHandle = (evt: React.FormEvent<HTMLInputElement>) => {
    if (evt.currentTarget.files){
      setFileName(evt.currentTarget.files[0].name);
      setIsError(false);
      props.callback(evt.currentTarget.files[0]);
    }
  };

  return (
    <div className={`drag-and-drop ${props.class} ${isError ? 'custom-input--error' : ''}`}>
      <label>
        <span className="drag-and-drop__label" tabIndex={0}>{fileName}
          <svg width="20" height="20" aria-hidden="true">
            <use xlinkHref="#icon-import"/>
          </svg>
        </span>
        <input type="file" name="import" tabIndex={-1} accept={props.accept} onInput={inputHandle}/>
        <span className="custom-input__error">{errorMessage}</span>
      </label>
    </div>
  );
}

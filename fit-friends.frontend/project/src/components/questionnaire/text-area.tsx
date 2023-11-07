import React, {useEffect, useState} from 'react';

interface TextAreaProps {
  callback: (value: string) => void;
  errorMessage: string;
  class: string;
  label?: string;
  value?: string;
  disabled?: boolean;
}

export default function TextArea({callback, errorMessage, ...props}: TextAreaProps): JSX.Element {
  const [input, setInput] = useState(props.value || '');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(errorMessage.length > 0);
  }, [errorMessage]);

  const inputHandle = (evt: React.FormEvent<HTMLTextAreaElement>) => {
    setInput(evt.currentTarget.value);
    setIsError(false);
    callback(evt.currentTarget.value);
  };

  return (
    <div className={`custom-textarea ${props.class} ${isError ? 'custom-input--error' : ''}`}>
      <label>
        {props.label && <span className="custom-textarea__label">{props.label}</span>}
        <textarea name="description" placeholder=" " value={input} onInput={inputHandle} disabled={props.disabled}/>
        <span className="custom-input__error">{errorMessage}</span>
      </label>
    </div>
  );
}

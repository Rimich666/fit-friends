import TextArea from './text-area';

interface MeritsProps {
  callback: (value: string) => void;
  errorMessage: string;
}

export default function Merits({errorMessage, ...props}: MeritsProps): JSX.Element {
  return (
    <>
      <span className="questionnaire-coach__legend">Расскажите о своём опыте, который мы сможем проверить</span>
      <TextArea callback={props.callback} class={'questionnaire-coach__textarea'} errorMessage={errorMessage}/>
    </>
  );
}


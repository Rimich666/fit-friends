type BtnCheckboxProps = {
  checked: boolean;
  value: string;
  text: string;
  name: string;
}

export default function BtnCheckbox(props: BtnCheckboxProps): JSX.Element {
  return (
    <div className="btn-checkbox">
      <label>
        <input
          className="visually-hidden"
          type="checkbox"
          name={props.name}
          value={props.value}
          checked={props.checked}
        />
        <span className="btn-checkbox__btn">{props.text}</span>
      </label>
    </div>
  );
}

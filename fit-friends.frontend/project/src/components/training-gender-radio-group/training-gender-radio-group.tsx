export default function TrainingGenderRadioGroup(): JSX.Element {
  return (
    <div className="create-training__radio-wrapper">
      <span className="create-training__label">Кому подойдет тренировка</span>
      <br/>
      <div className="custom-toggle-radio create-training__radio">
        <div className="custom-toggle-radio__block">
          <label>
            <input type="radio" name="gender"/>
            <span className="custom-toggle-radio__icon"></span>
            <span className="custom-toggle-radio__label">Мужчинам</span>
          </label>
        </div>
        <div className="custom-toggle-radio__block">
          <label>
            <input type="radio" name="gender" checked/>
            <span className="custom-toggle-radio__icon"></span>
            <span className="custom-toggle-radio__label">Женщинам</span>
          </label>
        </div>
        <div className="custom-toggle-radio__block">
          <label>
            <input type="radio" name="gender"/>
            <span className="custom-toggle-radio__icon"></span>
            <span className="custom-toggle-radio__label">Всем</span>
          </label>
        </div>
      </div>
    </div>
  );
}

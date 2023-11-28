import Input from '../../input/input';
import {Inputs} from '../../input/inputs';
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {
  fillCreateTrainingErrors,
  getEmptyCreateTrainingErrors,
  getNewCreateTraining
} from '../../../helpers/get-new-create-training';
import CustomSelect from '../../custom-select/custom-select';
import {Gender, Level, LevelText, TrainingTime, TrainingType, TrainingTypeText} from '../../../enums';
import UserGenderRadioGroup from '../../auth/user-gender-radio-group/user-gender-radio-group';
import TextArea from '../../text-area/text-area';
import FileLoad from '../../file-load/file-load';
import {createTrainingValidators, validate} from '../../../utils/validate';
import {createTrainingAction} from '../../../store/api-actions/api-actions';
import {ComponentVariant} from '../../../component-variant';
import {selectCurrentUser} from '../../../store/register-process/register-selectors';
import {selectCreateTraining} from '../../../store/training-process/training.selectors';

export default function CreateTrainingForm(): JSX.Element {
  const [training] = useState(getNewCreateTraining());
  const [errors, setErrors] = useState(getEmptyCreateTrainingErrors());
  // const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useAppDispatch();

  const {createTrainingErrors, isCreateTrainingError} =
    useAppSelector(selectCreateTraining);

  useEffect(() => {
    if (isCreateTrainingError) {
      setErrors({...createTrainingErrors});
    }
  }, [isCreateTrainingError]);

  const userId = useAppSelector(selectCurrentUser).id;

  const onInputName = (text: string) => {
    training.name = text;
    errors.name = '';
  };

  const onInputDescription = (text: string) => {
    training.description = text;
    errors.description = '';
  };

  const onInputCalories = (text: string) => {
    training.caloriesCount = parseInt(text, 10);
    errors.caloriesCount = '';
  };

  const onInputPrice = (text: string) => {
    training.price = parseInt(text, 10);
    errors.price = '';
  };

  const onSelectType = (value: string) => {
    training.trainingType = TrainingType[value as keyof typeof TrainingType];
    errors.trainingType = '';
  };

  const onSelectLevel = (value: string) => {
    training.level = Level[value as keyof typeof Level];
    errors.level = '';
  };

  const onSelectTime = (value: string) => {
    training.trainingTime = value as TrainingTime;
    errors.trainingTime = '';
  };

  const onChangeGender = (value: string) => {
    training.gender = Gender[value as keyof typeof Gender];
    errors.gender = '';
  };

  const onSelectFile = (selectedFile: File[]) => {
    training.video = selectedFile[0];
    errors.video = '';
  };

  const submitHandle = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const validateErrors = validate(training, createTrainingValidators);
    const isError = Object.values(validateErrors).join('').length > 0;
    if (isError){
      setErrors(fillCreateTrainingErrors(validateErrors));
      return;
    }
    if (Object.values(errors).join('').length === 0) {
      const {video, ...dto} = training;
      const payload = new FormData();
      payload.append('training', JSON.stringify({...dto, coachId: userId}));
      payload.append('video', video);
      dispatch(createTrainingAction(payload));
    }
  };

  return (
    <form method="get" onSubmit={submitHandle}>
      <div className="create-training">
        <div className="create-training__wrapper">
          <div className="create-training__block">
            <h2 className="create-training__legend">Название тренировки</h2>
            <Input {...{...Inputs.trainingName}} callback={onInputName} errorMessage={errors.name}/>
          </div>
          <div className="create-training__block">
            <h2 className="create-training__legend">Характеристики тренировки</h2>
            <div className="create-training__info">
              <CustomSelect title={'Выберите тип тренировки'} options={TrainingTypeText} callback={onSelectType}
                errorMessage={errors.trainingType} disabled={false}
              />
              <Input {...{...Inputs.trainingCaloriesTraining}} callback={onInputCalories} errorMessage={errors.caloriesCount}/>
              <CustomSelect
                title={'Сколько времени потратим'} options={TrainingTime} callback={onSelectTime}
                errorMessage={errors.trainingTime} disabled={false}
              />
              <Input {...{...Inputs.price}} callback={onInputPrice} errorMessage={errors.price}/>
              <CustomSelect title={'Выберите уровень тренировки'} options={LevelText}
                callback={onSelectLevel} errorMessage={errors.level} disabled={false}
              />
              <UserGenderRadioGroup callback={onChangeGender} value={training.gender}
                variant={ComponentVariant.createTraining}
              />
            </div>
          </div>
          <div className="create-training__block">
            <h2 className="create-training__legend">Описание тренировки</h2>
            <TextArea callback={onInputDescription} errorMessage={errors.description} class={'create-training__textarea'}/>
          </div>
          <div className="create-training__block">
            <h2 className="create-training__legend">Загрузите видео-тренировку</h2>
            <FileLoad
              errorMessage={errors.video} class={'create-training__drag-and-drop'}
              label={'Загрузите сюда файлы формата MOV, AVI или MP4'} accept={'.mov, .avi, .mp4'}
              icon={'#icon-import-video'} callback={onSelectFile}
            />
          </div>
        </div>
        <button className="btn create-training__button" type="submit">Опубликовать</button>
      </div>
    </form>
  );
}

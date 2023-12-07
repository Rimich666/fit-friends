import TrainingInfoHeader from './training-info.header';
import TrainingInfoForm from './training-info.form';
import {Role} from '../../../enums';
import VideoBlock from './video-block';
import {useEffect, useState} from 'react';
import {ButtonsMode, TrainingInfoMode} from './training-info-mode';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {
  selectCard,
  selectIsTrainingCardLoading,
  selectUpdateTraining
} from '../../../store/training-process/training.selectors';
import {SpinnerCircular} from 'spinners-react';
import {UpdateTrainingCardInterface} from '../../../types/update-training-card.interface';
import {updateTrainingCard} from '../../../store/api-actions/api-actions';
import {makeUpdateTrainingCardPayload} from '../../../helpers/make-update-training-payload';
import {setBuy} from '../../../store/popup-process/popup.process';
import {DISCOUNT} from '../../../settings';
import {fillUpdateTrainingErrors, getEmptyUpdateTrainingErrors} from '../../../helpers/get-new-update-training';
import {updateTrainingValidators, validate} from '../../../utils/validate';

type TrainingInfoSectionProps = {
  role: Role;
  onClickBuy: () => void;
}

export default function TrainingInfoSection({role, onClickBuy}: TrainingInfoSectionProps): JSX.Element {
  const [mode, setMode] = useState(TrainingInfoMode.read);
  const isLoading = useAppSelector(selectIsTrainingCardLoading);
  const {coach, id, ...card} = useAppSelector(selectCard);
  const [changes] = useState<UpdateTrainingCardInterface>({training: {}, id: id});
  const [errors, setErrors] = useState(getEmptyUpdateTrainingErrors());
  const dispatch = useAppDispatch();

  const {
    updateTrainingErrors,
    isUpdateTrainingError,
  } = useAppSelector(selectUpdateTraining);

  useEffect(() => {
    if (isUpdateTrainingError) {
      setErrors({...updateTrainingErrors});
    }
  }, [isUpdateTrainingError]);

  const saveChanges = () => {
    const validateErrors = validate(errors.video ?
      {...changes.training, video: changes.video as File} : {...changes.training}, updateTrainingValidators);
    const isError = Object.values(validateErrors).join('').length > 0;
    if (isError){
      setErrors(fillUpdateTrainingErrors(validateErrors));
      return;
    }
    dispatch(updateTrainingCard(makeUpdateTrainingCardPayload({...changes, id})));
  };

  const onBuy = () => {
    dispatch(setBuy({
      name: card.name,
      price: card.isSpecialOffer ? card.price / 100 * (100 - DISCOUNT) : card.price,
      src: card.backgroundPath,
      trainingId: id
    }));
    onClickBuy();
  };

  const onInputName = (text: string) => {
    changes.training.name = text;
  };
  const onInputDescription = (text: string) => {
    changes.training.description = text;
  };

  const onInputPrice = (value: number) => {
    changes.training.price = value;
  };

  const onChangeDiscount = (value: boolean) => {
    changes.training.isSpecialOffer = value;
  };

  const callbacks = {onInputPrice, onInputName, onInputDescription, onChangeDiscount, onBuy};

  const onChangeMode = (value: string) => {
    if (value === ButtonsMode.save) {
      saveChanges();
      setMode(TrainingInfoMode.read);
      return;
    }
    setMode(TrainingInfoMode.edit);
  };

  const isDisabled = role === Role.sportsman || mode === TrainingInfoMode.read;

  if (isLoading) {
    return (<SpinnerCircular/>);
  }

  return (
    <div className={`training-card training-card${mode}`}>
      <div className="training-info">
        <h2 className="visually-hidden">Информация о тренировке</h2>
        <TrainingInfoHeader {...{...coach, role, callback: onChangeMode}}/>
        <div className="training-info__main-content">
          <TrainingInfoForm {...{...card, isDisabled, role, callbacks }}/>
        </div>
      </div>
      <VideoBlock role={role} video={card.videoPath} id={id} img={card.backgroundPath}/>
    </div>
  );
}

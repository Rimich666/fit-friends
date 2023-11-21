import TrainingCardSlider from '../../training-card-slider/training-card.slider';
import {ComponentVariant} from '../../../component-variant';
import {useAppSelector} from '../../../hooks';
import {selectTrainingsForCoachCard} from '../../../store/training-process/training.selectors';
import {SpinnerCircular} from 'spinners-react';
import NotFoundMain from '../../main-not-found/not-found.main';
import WantTrainingButton from './wantTraining.button';
import AgreementCheck from './agreement.check';

type CoachCardProps = {
  isReady: boolean;
}

export default function CoachCardTrainings({isReady}: CoachCardProps): JSX.Element {
  const {trainings, isLoading, isLoaded} = useAppSelector(selectTrainingsForCoachCard);
  if (isLoading){
    return (<SpinnerCircular/>);
  }

  if (!isLoaded){
    return (<NotFoundMain/>);
  }

  return (
    <div className="user-card-coach__training popular-trainings">
      <TrainingCardSlider trainingProps={trainings} variant={ComponentVariant.userCard}/>
      <form className="user-card-coach__training-form">
        <WantTrainingButton/>
        <div className="user-card-coach__training-check">
          <div className="custom-toggle custom-toggle--checkbox">
            <label>
              <AgreementCheck/>
              <span className="custom-toggle__icon">
                <svg width="9" height="6" aria-hidden="true">
                  <use xlinkHref="#arrow-check"/>
                </svg>
              </span>
              <span className="custom-toggle__label">Получать уведомление на почту о новой тренировке</span>
            </label>

          </div>
        </div>
      </form>
    </div>
  );
}

import SpecialForYouSection from '../special-for-you/special-for-you.section';
import SpecialOfferList from '../special-offer/special-offer.list';
import {useAppSelector} from '../../../hooks';
import {selectIsUserLoaded, selectIsUserLoading} from '../../../store/register-process/register-selectors';
import {SpinnerCircular} from 'spinners-react';
import NotFoundMain from '../../main-not-found/not-found.main';
import Plug from '../plug/plug';
import PopularTrainingSection from '../popular-training/popular-training.section';
import LookForCompanySection from '../look-for-company/look-for-company.section';

export default function MainMain(): JSX.Element {
  const isLoading = useAppSelector(selectIsUserLoading);
  const isLoaded = useAppSelector(selectIsUserLoaded);
  if (isLoading){
    return (<SpinnerCircular/>);
  }

  if (!isLoaded){
    return (<NotFoundMain/>);
  }

  return (
    <main>
      <h1 className="visually-hidden">FitFriends — Время находить тренировки, спортзалы и друзей спортсменов</h1>
      <SpecialForYouSection/>
      <section className="special-offers">
        <div className="container">
          <div className="special-offers__wrapper">
            <h2 className="visually-hidden">Специальные предложения</h2>
            <SpecialOfferList/>
            <Plug/>
          </div>
        </div>
      </section>
      <PopularTrainingSection/>
      <LookForCompanySection/>
    </main>
  );
}

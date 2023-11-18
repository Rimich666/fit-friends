import Card from '../../training-card-mini/card';
import {ComponentVariant, TrainingCardClass} from '../../../component-variant';
import {userCardData} from './user-card-data';
import UserCard from '../../user-card-mini/user-card';
import {Role} from '../../../enums';
import {useAppSelector} from '../../../hooks';
import {
  makeSelectTrainings,
} from '../../../store/training-process/training.selectors';

type CardListProps = {
  variant: ComponentVariant;
}

export default function CardList({variant}: CardListProps): JSX.Element {
  const trainingCatalogSelector = makeSelectTrainings;
  const trainingCatalog =
    useAppSelector((state) => trainingCatalogSelector(state, variant));

  console.log('CardList');
  return (
    <ul className={`${TrainingCardClass[variant as keyof typeof TrainingCardClass]}__list`}>
      {(variant === ComponentVariant.trainingCatalog || variant === ComponentVariant.myTraining) &&
        trainingCatalog.map((card) => <Card {...{...card, variant}} key={card.id}/>
        )}
      {variant === ComponentVariant.userCatalog &&
      userCardData.map((card) => (
        <UserCard {...{...card, dark: card.role === Role.coach, variant: ComponentVariant.userCatalog}}
          key={card.id}
        />))}
    </ul>
  );
}

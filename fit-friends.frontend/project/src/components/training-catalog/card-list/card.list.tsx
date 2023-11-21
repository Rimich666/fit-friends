import Card from '../../training-card-mini/card';
import {CatalogListClass, ComponentVariant} from '../../../component-variant';
import UserCard from '../../user-card-mini/user-card';
import {Role} from '../../../enums';
import {useAppSelector} from '../../../hooks';
import {
  makeSelectTrainings,
} from '../../../store/training-process/training.selectors';
import {selectUserCatalog} from '../../../store/user-process/user.selectors';

type CardListProps = {
  variant: ComponentVariant;
}

export default function CardList({variant}: CardListProps): JSX.Element {
  const trainingCatalogSelector = makeSelectTrainings;
  const trainingCatalog =
    useAppSelector((state) => trainingCatalogSelector(state, variant));
  const userCatalog = useAppSelector(selectUserCatalog);

  console.log('CardList');
  return (
    <ul className={`${CatalogListClass[variant as keyof typeof CatalogListClass]}`}>
      {(variant === ComponentVariant.trainingCatalog || variant === ComponentVariant.myTraining) &&
        trainingCatalog.map((card) => <Card {...{...card, variant}} key={card.id}/>
        )}
      {variant === ComponentVariant.userCatalog &&
      userCatalog.map((card) => (
        <UserCard {...{...card, dark: card.role === Role.coach, variant: ComponentVariant.userCatalog}}
          key={card.id}
        />))}
    </ul>
  );
}

import Filters from '../filters/filters';
import CardList from '../card-list/card.list';
import {backRoute, FilterTitle, FormClass, H1} from '../variances';
import ButtonBlock from '../buttons-block/button-block';
import {ComponentVariant} from '../../../component-variant';
import {useNavigate} from 'react-router-dom';

type CatalogTrainingsMainProps = {
  variant: ComponentVariant;
}

export default function CatalogMain({variant}: CatalogTrainingsMainProps): JSX.Element {
  const formClass = FormClass[variant as keyof typeof FormClass];
  const navigate = useNavigate();

  console.log('CatalogMain');

  const clickBackHandle = () => {
    navigate(backRoute[variant as keyof typeof backRoute]);
  };
  return (
    <main>
      <section className="inner-page">
        <div className="container">
          <div className="inner-page__wrapper">
            <h1 className="visually-hidden">{H1[variant as keyof typeof H1]}</h1>
            <div className={formClass}>
              <h2 className="visually-hidden">{FilterTitle[variant as keyof typeof FilterTitle]}</h2>
              <div className={`${formClass}__wrapper`}>
                <button className={`btn-flat btn-flat--underlined ${formClass}__btnback`} type="button"
                  onClick={clickBackHandle}
                >
                  <svg width="14" height="10" aria-hidden="true">
                    <use xlinkHref="#arrow-left"/>
                  </svg>
                  <span>Назад</span>
                </button>
                <h3 className={`${formClass}__title`}>фильтры</h3>
                <Filters variant={variant}/>
              </div>
            </div>
            {variant === ComponentVariant.myTraining &&
              <div className="inner-page__content">
                <div className="my-trainings">
                  <CardList variant={variant}/>
                  <ButtonBlock/>
                </div>
              </div>}
            {variant === ComponentVariant.trainingCatalog &&
              <div className="training-catalog">
                <CardList variant={variant}/>
                <ButtonBlock/>
              </div>}
            {variant === ComponentVariant.userCatalog &&
              <div className="users-catalog">
                <CardList variant={variant}/>
                <ButtonBlock/>
              </div>}
          </div>
        </div>
      </section>
    </main>
  );
}

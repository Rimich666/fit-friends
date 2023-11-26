import Header from '../components/header/header';
import PurchasesMain from '../components/purchases/purchases.main';
import {Helmet} from 'react-helmet';

export default function Purchases(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>Мои покупки - FitFriends</title>
      </Helmet>
      <Header/>
      <PurchasesMain/>
    </>
  );
}

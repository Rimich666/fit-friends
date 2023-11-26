import Header from '../components/header/header';
import MainMain from '../components/main-page/main/main.main';
import {Helmet} from 'react-helmet';


export default function Main(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>FitFriends</title>
      </Helmet>
      <Header/>
      <MainMain/>
    </>
  );
}

import Header from '../components/header/header';
import useFetchSelf from '../hooks/use-fetch-self';
import MainMain from '../components/main-page/main/main.main';


export default function Main(): JSX.Element {
  useFetchSelf();

  return (
    <>
      <Header/>
      <MainMain/>
    </>
  );
}

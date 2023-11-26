import LookForCompanyList from './look-for-company.list';
import {useAppSelector} from '../../../hooks';
import {SpinnerCircular} from 'spinners-react';
import useFetchCompany from '../../../hooks/use-fetch-company';
import {selectCompany, selectIsCompanyLoading} from '../../../store/user-process/user.selectors';
import {getCompanyProps} from '../../../helpers/get-company-props';

export default function LookForCompanySection(): JSX.Element {
  useFetchCompany();
  const isLoading = useAppSelector(selectIsCompanyLoading);
  const users = useAppSelector(selectCompany);
  if (isLoading){
    return (<SpinnerCircular/>);
  }
  const companyProps = getCompanyProps(users);
  return (
    <section className="look-for-company">
      <div className="container">
        <LookForCompanyList propsLook={companyProps}/>
      </div>
    </section>
  );
}

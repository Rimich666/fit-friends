import {useAppSelector} from '../../../hooks';
import {selectPagesCount} from '../../../store/popup-process/popup.selectors';
import {useState} from 'react';

type ButtonBlockProps = {
  page: number;
  onPageClick: (page: number) => void;
}

export default function ButtonBlock({page, onPageClick}: ButtonBlockProps): JSX.Element {
  const [pageNum, setPageNum] = useState(page);
  const pages = useAppSelector(selectPagesCount);
  const clickPageHandle = () => {
    onPageClick(pageNum + 1);
    setPageNum(pageNum + 1);
  };
  const backToBegin = () => {
    onPageClick(1);
    setPageNum(1);
  };
  return (
    <div className="show-more my-trainings__show-more">
      <button className="btn show-more__button show-more__button--more" type="button"
        onClick={clickPageHandle} disabled={pageNum === pages}
      >Показать еще
      </button>
      <button className="btn show-more__button show-more__button--to-top" type="button" onClick={backToBegin}>
        Вернуться в начало
      </button>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeItemsPerPage } from '../../reducer';

import './pagination-panel.css';

const PaginationPanel = (props: {
  page: number;
  updatePage: (value: number) => void;
}) => {
  const [isPrevButtonDisabled, setPrevButtonDisabled] = useState(true);
  const [isNextButtonDisabled, setNextButtonDisabled] = useState(false);

  const showPrevPage = () => {
    props.updatePage(props.page - 1);
  };

  const showNextPage = () => {
    props.updatePage(props.page + 1);
  };

  const itemsPerPage = useSelector(
    (state: unknown) =>
      (state as { toolkit: { itemsPerPage: number } }).toolkit.itemsPerPage
  );

  const dispatch = useDispatch();

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(changeItemsPerPage(parseInt(e.target.value)));
    props.updatePage(1);
  };

  useEffect(() => {
    setPrevButtonDisabled(props.page === 1);
    setNextButtonDisabled(props.page === 2128);
  }, [props.page]);

  return (
    <>
      <div className="pagination-panel">
        <button
          type="button"
          className="btn prev-btn"
          onClick={showPrevPage}
          disabled={isPrevButtonDisabled}
        >
          Prev
        </button>
        <div className="current-page">{props.page}</div>
        <button
          type="button"
          className="btn next-btn"
          onClick={showNextPage}
          disabled={isNextButtonDisabled}
        >
          Next
        </button>
      </div>
      <div className="items-per-page">
        <span>Items per page: </span>
        <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
          <option value="12">12</option>
          <option value="6">6</option>
          <option value="3">3</option>
        </select>
      </div>
    </>
  );
};

export default PaginationPanel;

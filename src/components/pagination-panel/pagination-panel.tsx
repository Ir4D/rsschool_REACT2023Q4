import { useEffect, useState } from 'react';

import './pagination-panel.css';

const PaginationPanel = (props: {
  page: number;
  updatePage: (value: number) => void;
  itemsPerPage: number;
  setItemsPerPage: (value: number) => void;
}) => {
  const [isPrevButtonDisabled, setPrevButtonDisabled] = useState(true);
  const [isNextButtonDisabled, setNextButtonDisabled] = useState(false);

  const showPrevPage = () => {
    props.updatePage(props.page - 1);
  };

  const showNextPage = () => {
    props.updatePage(props.page + 1);
  };

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    props.setItemsPerPage(parseInt(e.target.value));
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
          {/* <Link to={`/rsschool_REACT2023Q4/${props.page}`}>Next</Link> */}
          Next
        </button>
      </div>
      <div className="items-per-page">
        <span>Items per page: </span>
        <select value={props.itemsPerPage} onChange={handleItemsPerPageChange}>
          <option value="12">12</option>
          <option value="6">6</option>
        </select>
      </div>
    </>
  );
};

export default PaginationPanel;

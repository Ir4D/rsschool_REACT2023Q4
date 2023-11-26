import { ChangeEvent, useEffect, useState } from 'react';

import style from "../styles/PaginationPanel.module.css";
import styles from '../styles/SearchPanel.module.css';
import { useRouter } from 'next/router';

const Search = (props: {
  page: number;
  updatePage: (value: number) => void;
  itemsPerPage: number;
  setItemsPerPage: (value: number) => void;
  updateData: (arg0: string) => void;
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isPrevButtonDisabled, setPrevButtonDisabled] = useState(true);
  const [isNextButtonDisabled, setNextButtonDisabled] = useState(false);

  const router = useRouter();

  const saveToLocalStorage = (value: string) => {
    localStorage.setItem('searchInput', value);
  };

  const loadFromLocalStorage = () => {
    const savedValue = localStorage.getItem('searchInput');
    if (savedValue) {
      setInputValue(() => savedValue);
    }
  };

  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  const searchNewResults = () => {
    saveToLocalStorage(inputValue);
    router.push(`?search=${inputValue}&page=1&itemsPerPage=${props.itemsPerPage}`);
    props.updateData(inputValue);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(() => e.target.value);
  };

  const showPrevPage = () => {
    const newPage = props.page - 1;
    props.updatePage(newPage);
    router.push(`?search=${inputValue}&page=${newPage}&itemsPerPage=${props.itemsPerPage}`);
  };

  const showNextPage = () => {
    const newPage = props.page + 1;
    props.updatePage(newPage);
    router.push(`?search=${inputValue}&page=${newPage}&itemsPerPage=${props.itemsPerPage}`);
  };

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newItemsPerPage = parseInt(e.target.value);
    props.setItemsPerPage(newItemsPerPage);
    props.updatePage(1);
    router.push(`?search=${inputValue}&page=1&itemsPerPage=${newItemsPerPage}`);
  };

  useEffect(() => {
    setPrevButtonDisabled(props.page === 1);
    setNextButtonDisabled(props.page === 2128);
  }, [props.page]);

  return (
    <>
      <div className={styles.searchPanel}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Type here"
          value={inputValue}
          onChange={handleInputChange}
        />

        <button 
          type="submit" 
          className={styles.searchBtn} 
          onClick={searchNewResults}
        >
          Search
        </button>
      </div>
      <div className={style.paginationPanel}>
        <button
          type="button"
          className={`${style.btn} ${style.prevBtn}`}
          onClick={showPrevPage}
          disabled={isPrevButtonDisabled}
        >
          Prev
        </button>
        <div className={style.currentPage}>{props.page}</div>
        <button
          type="button"
          className={`${style.btn} ${style.nextBtn}`}
          onClick={showNextPage}
          disabled={isNextButtonDisabled}
        >
          Next
        </button>
      </div>
      <div className={style.itemsPerPage}>
        <span>Items per page: </span>
        <select value={props.itemsPerPage} onChange={handleItemsPerPageChange}>
          <option value="12">12</option>
          <option value="6">6</option>
        </select>
      </div>
    </>
  );
};

export default Search;

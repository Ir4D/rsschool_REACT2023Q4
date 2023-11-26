import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useMyContext } from './MyContext';

import styles from '../styles/SearchPanel.module.css';
import style from "../styles/PaginationPanel.module.css";

const Search = () => {
  const [inputValue, setInputValue] = useState('');
  const [isPrevButtonDisabled, setPrevButtonDisabled] = useState(true);
  const [isNextButtonDisabled, setNextButtonDisabled] = useState(false);

  const { term, setTerm, itemsPerPage, setItemsPerPage, currentPage, setCurrentPage, updateData, updatePage } = useMyContext();

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
    router.push(`?search=${inputValue}&page=1&itemsPerPage=${itemsPerPage}`);
    updateData(inputValue);
    setTerm(inputValue);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(() => e.target.value);
  };

  const showPrevPage = () => {
    const newPage = currentPage - 1;
    updatePage(newPage);
    router.push(`?search=${inputValue}&page=${newPage}&itemsPerPage=${itemsPerPage}`);
  };

  const showNextPage = () => {
    const newPage = currentPage + 1;
    updatePage(newPage);
    router.push(`?search=${inputValue}&page=${newPage}&itemsPerPage=${itemsPerPage}`);
  };

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newItemsPerPage = parseInt(e.target.value);
    setItemsPerPage(newItemsPerPage);
    updatePage(1);
    router.push(`?search=${inputValue}&page=1&itemsPerPage=${newItemsPerPage}`);
  };

  useEffect(() => {
    setPrevButtonDisabled(currentPage === 1);
    setNextButtonDisabled(currentPage === 2128);
  }, [currentPage]);

  const isDetailsPage = router.pathname.includes('/details');

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
          disabled={isDetailsPage}
        >
          Search
        </button>
      </div>
      <div className={style.paginationPanel}>
        <button
          type="button"
          className={`${style.btn} ${style.prevBtn}`}
          onClick={showPrevPage}
          // disabled={isPrevButtonDisabled}
          disabled={isPrevButtonDisabled || isDetailsPage}
        >
          Prev
        </button>
        <div className={style.currentPage}>{currentPage}</div>
        <button
          type="button"
          className={`${style.btn} ${style.nextBtn}`}
          onClick={showNextPage}
          // disabled={isNextButtonDisabled}
          disabled={isNextButtonDisabled || isDetailsPage}
        >
          Next
        </button>
      </div>
      <div className={style.itemsPerPage}>
        <span>Items per page: </span>
        <select 
          value={itemsPerPage} 
          onChange={handleItemsPerPageChange}
          disabled={isDetailsPage}
        >
          <option value="12">12</option>
          <option value="6">6</option>
        </select>
      </div>
    </>
  );
};

export default Search;

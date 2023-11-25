import { ChangeEvent, useEffect, useState } from 'react';
import styles from '../styles/SearchPanel.module.css';

const SearchPanel = (props: { updateData: (arg0: string) => void }) => {
  const [inputValue, setInputValue] = useState('');

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
    props.updateData(inputValue);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(() => e.target.value);
  };
  
  return (
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
  );
};

export default SearchPanel;

import { ChangeEvent, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changeTerm } from '../../reducer';

import './search-panel.css';

const SearchPanel = () => {
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

  const dispatch = useDispatch();

  const searchNewResults = () => {
    dispatch(changeTerm(inputValue));
    saveToLocalStorage(inputValue);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(() => e.target.value);
  };

  return (
    <div className="search-panel">
      <input
        type="text"
        className="search-input"
        placeholder="Type here"
        value={inputValue}
        onChange={handleInputChange}
      />

      <button type="submit" className="search-btn" onClick={searchNewResults}>
        Search
      </button>
    </div>
  );
};

export default SearchPanel;

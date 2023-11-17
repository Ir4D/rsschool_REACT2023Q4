import { ChangeEvent, useState, useEffect, useContext } from 'react';
import { Context } from '../pages/main-page';
import { useDispatch } from 'react-redux';

import './search-panel.css';

const SearchPanel = () => {
  const [inputValue, setInputValue] = useState('');
  const { updateData } = useContext(Context);

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
    dispatch({ type: 'newTerm', payload: inputValue });
    saveToLocalStorage(inputValue);
    updateData(inputValue);
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

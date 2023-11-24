import styles from '../styles/SearchPanel.module.css';

const SearchPanel = () => {
  return (
    <div className={styles.searchPanel}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Type here"
        // value={inputValue}
        // onChange={handleInputChange}
      />

      <button 
        type="submit" 
        className={styles.searchBtn} 
        // onClick={searchNewResults}
      >
        Search
      </button>
    </div>
  );
};

export default SearchPanel;

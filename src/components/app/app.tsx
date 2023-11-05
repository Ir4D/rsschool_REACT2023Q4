import { useState } from 'react';

import SearchPanel from '../search-panel/search-panel';
import ResultsList from '../results-list/results-list';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import './app.css';

const App = () => {
  const [term, setTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const updateData = (value: string) => {
    setTerm(value);
  };

  return (
    <div>
      <h1 className="app-heading">Anime List:</h1>
      <SearchPanel updateData={updateData} />
      <ErrorBoundary>
        <ResultsList
          term={term}
          page={currentPage}
          setPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
        />
      </ErrorBoundary>
    </div>
  );
};

export default App;

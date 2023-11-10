import { useState, createContext } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import SearchPanel from '../search-panel/search-panel';
import ResultsList from '../results-list/results-list';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import './main-page.css';

type ContextProps = {
  term: string;
  setTerm: (value: string) => void;
  updateData: (value: string) => void;
  resultsList: never[];
  setResultList: (value: []) => void;
};

export const Context = createContext<ContextProps>({
  term: '',
  setTerm: () => {},
  updateData: () => {},
  resultsList: [],
  setResultList: () => {},
});

const MainPage = () => {
  const [term, setTerm] = useState('');
  const [resultsList, setResultList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const navigate = useNavigate();
  const location = useLocation();

  const updateData = (value: string) => {
    setTerm(value);
  };

  const goToMainPage = () => {
    if (location.pathname !== '/rsschool_REACT2023Q4/') {
      navigate('/rsschool_REACT2023Q4/');
    }
  };

  const isMainPage = location.pathname !== '/rsschool_REACT2023Q4/';

  return (
    <Context.Provider
      value={{
        term,
        setTerm,
        updateData,
        resultsList,
        setResultList,
      }}
    >
      <div className="app-wrapper">
        <div
          className={`app-main ${isMainPage ? 'unactive' : ''}`}
          onClick={goToMainPage}
        >
          <h1 className="app-heading">Anime List:</h1>
          <SearchPanel />
          <ErrorBoundary>
            <ResultsList
              page={currentPage}
              setPage={setCurrentPage}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
            />
          </ErrorBoundary>
        </div>
        <Outlet />
      </div>
    </Context.Provider>
  );
};

export default MainPage;

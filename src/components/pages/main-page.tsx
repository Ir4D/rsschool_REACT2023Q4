import { useState, createContext } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import SearchPanel from '../search-panel/search-panel';
import ResultsList from '../results-list/results-list';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import './main-page.css';
import { useDispatch } from 'react-redux';

export type ContextProps = {
  // term: string;
  // setTerm: (value: string) => void;
  updateData: (value: string) => void;
  resultsList: never[];
  setResultList: (value: []) => void;
  children?: React.ReactNode;
};

export const Context = createContext<ContextProps>({
  // term: '',
  // setTerm: () => {},
  updateData: () => {},
  resultsList: [],
  setResultList: () => {},
});

const MainPage: React.FC<ContextProps> = ({ children }) => {
  // const [term, setTerm] = useState('');
  const [resultsList, setResultList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();

  const updateData = (value: string) => {
    // setTerm(value);
    dispatch({ type: 'newTerm', payload: value });
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
        // term,
        // setTerm,
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
          {children}
        </div>
        <Outlet />
      </div>
    </Context.Provider>
  );
};

export default MainPage;

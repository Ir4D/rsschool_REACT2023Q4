import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import SearchPanel from '../search-panel/search-panel';
import ResultsList from '../results-list/results-list';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import './main-page.css';

export type ContextProps = {
  children?: React.ReactNode;
};

const MainPage: React.FC<ContextProps> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  const goToMainPage = () => {
    if (location.pathname !== '/rsschool_REACT2023Q4/') {
      navigate('/rsschool_REACT2023Q4/');
    }
  };

  const isMainPage = location.pathname !== '/rsschool_REACT2023Q4/';

  return (
    <div className="app-wrapper">
      <div
        className={`app-main ${isMainPage ? 'unactive' : ''}`}
        onClick={goToMainPage}
      >
        <h1 className="app-heading">Anime List:</h1>
        <SearchPanel />
        <ErrorBoundary>
          <ResultsList page={currentPage} setPage={setCurrentPage} />
        </ErrorBoundary>
        {children}
      </div>
      <Outlet />
    </div>
  );
};

export default MainPage;

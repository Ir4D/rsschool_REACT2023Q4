import { Routes, Route } from 'react-router-dom';

import MainPage from '../pages/main-page';
import './app.css';
import Details from '../item-details/item-details';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/rsschool_REACT2023Q4/" element={<MainPage />}>
          <Route path="details/:id" element={<Details />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;

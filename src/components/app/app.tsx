import { Routes, Route } from 'react-router-dom';
import MainPage from '../pages/main-page';
// import Details from '../item-details/item-details';

import './app.css';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/rsschool_REACT2023Q4/" element={<MainPage />}>
          {/* <Route path="details/:id" element={<Details />} /> */}
        </Route>
      </Routes>
    </>
  );
};

export default App;

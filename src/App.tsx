import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import Header from './components/Header';
import FormUncontrComp from './pages/FormUncontrComp';
import FormReactHook from './pages/FormReactHook';

import './App.css';

function App() {
  return (
    <Router>
      <div className='app'>
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/uncontr-comp' element={<FormUncontrComp />} />
            <Route path='/react-hook' element={<FormReactHook />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App;

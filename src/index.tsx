import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './components/app/app';
// import { createStore } from 'redux';
import { Provider } from 'react-redux';
import toolkitSlice from './reducer';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import './index.css';

const rootReducer = combineReducers({
  toolkit: toolkitSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

// const store = createStore(reducer);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

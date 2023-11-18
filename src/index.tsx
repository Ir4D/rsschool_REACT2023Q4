import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import App from './components/app/app';
import toolkitSlice from './reducer';

import './index.css';

const rootReducer = combineReducers({
  toolkit: toolkitSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

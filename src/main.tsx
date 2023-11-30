import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import toolkitSlice from './reducer.tsx';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const rootReducer = combineReducers({
  toolkit: toolkitSlice,
});

export const store = configureStore({
  reducer: rootReducer,
})


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)

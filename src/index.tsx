import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import App from './components/app/app';
import toolkitSlice from './reducer';

import './index.css';
// import { apiSlice } from './services/apiSlice';
import { myApi } from './services/apiRequest';

// const rootReducer = combineReducers({
//   toolkit: toolkitSlice
// });

// export const store = configureStore({
//   reducer: rootReducer
// });

// export const store = configureStore({
//   reducer: {
//     [myApi.reducerPath]: myApi.reducer,
//   },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(myApi.middleware)
// });

const rootReducer = combineReducers({
  toolkit: toolkitSlice,
  [myApi.reducerPath]: myApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(myApi.middleware),
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

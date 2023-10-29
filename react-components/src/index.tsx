import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
// import ApiService from './services/api-service';
import './index.css';

// const apiService = new ApiService();

// apiService.getAllItems().then(data => data.results.forEach((elem: { name: string; }) => console.log(elem.name)));

// apiService.getAllItems().then(data => console.log(data.results));


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

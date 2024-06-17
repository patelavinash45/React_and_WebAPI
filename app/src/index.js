import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Live from './Components/Live';
import Scorecard from './Components/ScoreCard';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route index path='/' element={<App />} />
      <Route path='/Live/:id' element={<Live />} />
      <Route path='/Scorecard/:id' element={<Scorecard />} />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();

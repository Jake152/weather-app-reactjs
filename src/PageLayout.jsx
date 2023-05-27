import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage/HomePage';
import TodayPage from './Pages/TodayPage/TodayPage';
import WeatherHeader from './Components/WeatherHeader/WeatherHeader';
import WeatherFooter from './Components/WeatherFooter/WeatherFooter';

import './PageLayout.css';

export default function PageLayout() {
  return (
    <Router>
      <div id='page-layout'>
          <WeatherHeader />
          <main id='main-content-container'>
            <div id='main-content'>
              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/today' element={<TodayPage />} />
              </Routes>
            </div>
          </main>
          <WeatherFooter />
      </div>
    </Router>
  );
}

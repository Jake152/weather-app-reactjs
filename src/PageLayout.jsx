import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TodayPage from './Pages/TodayPage/TodayPage';
import HourlyPage from './Pages/HourlyPage/HourlyPage';
import WeatherHeader from './Components/WeatherHeader/WeatherHeader';
import WeatherFooter from './Components/WeatherFooter/WeatherFooter';
import LocationPermissionModal from './Components/LocationPermissionModal/LocationPermissionModal';

import 'bootstrap/dist/css/bootstrap.min.css';
import './PageLayout.css';

export default function PageLayout() {
  const [latitude, setLatitude] = useState(localStorage.getItem('latitude') || '');
  const [longitude, setLongitude] = useState(localStorage.getItem('longitude') || '');
  const [currentGeolocationAccess, setCurrentGeolocationAccess] = useState(
    sessionStorage.getItem('currentGeolocationAccess') === 'true' || false
  );
  const [showModal, setShowModal] = useState(
    sessionStorage.getItem('currentGeolocationAccess') !== 'true'
  );

  useEffect(() => {
    sessionStorage.setItem('currentGeolocationAccess', currentGeolocationAccess);
  }, [currentGeolocationAccess]);

  useEffect(() => {
    sessionStorage.setItem('showModal', showModal);
  }, [showModal]);

  const handleAllowLocationAccess = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
  
          sessionStorage.setItem('latitude', latitude);
          sessionStorage.setItem('longitude', longitude);
  
          setLatitude(latitude);
          setLongitude(longitude);
          setCurrentGeolocationAccess(true);
          setShowModal(false);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.log("Geo location is not supported by the browser");
    }
  };

  const handleDenyLocationAccess = () => {
    setLatitude('44.6879693');
    setLongitude('-93.2137714');
    setCurrentGeolocationAccess(false);
    setShowModal(false);
  };

  return (
    <Router>
      <div id='page-layout'>
        <WeatherHeader />
          <main id='main-content-container'>
            <div id='main-content'>
              {!showModal && (
                <Routes>
                  <Route path='/' element={<TodayPage latitude={latitude} longitude={longitude} />} />
                  <Route path='/hourly' element={<HourlyPage latitude={latitude} longitude={longitude} />} />
                </Routes>
              )}
            </div>
          </main>
          <WeatherFooter />
          <LocationPermissionModal showModal={showModal} handleAllowLocationAccess={handleAllowLocationAccess} handleDenyLocationAccess={handleDenyLocationAccess} />
      </div>
    </Router>
  );
}

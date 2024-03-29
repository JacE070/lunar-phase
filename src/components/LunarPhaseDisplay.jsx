import React, { useState, useEffect } from 'react';
import { getLunarData } from '../services/lunarService';
import { CircleLoader } from 'react-spinners';

const today = new Date().toISOString().split('T')[0];

const LunarPhaseDisplay = () => {
  const [date, setDate] = useState(today);
  const [lunarData, setLunarData] = useState(null);
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [locationAllowed, setLocationAllowed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const fetchLunarData = () => {
    setIsLoading(true);
    if (date && locationAllowed && location.latitude && location.longitude) {
      getLunarData(location.latitude, location.longitude, date)
        .then(data => {setLunarData(data); setIsLoading(false);})
        .catch(error => {console.error('Error fetching lunar data:', error); setIsLoading(false);});
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLocationAllowed(true);
      },
      () => {
        alert('Location access denied. Defaulting to L.A.');
        setLocation({
          latitude: 34.0522,
          longitude: -118.2437,
        });
        setLocationAllowed(true);
      }
    );
  }, []);

  return (
    <div>
      <div className='moon-phase-slot'>
        {isLoading ? (
          <CircleLoader
          color="#36d7b7"
          loading
          speedMultiplier={1}
          />    
        ) : lunarData ? (
          <div>
            {/* <h2>{lunarData.phaseName}</h2> */}
            <img src={lunarData.imageUrl} alt="Moon phase" />
          </div>
        ) : null}
      </div>
      <input type="date" value={date} onChange={handleDateChange} />
      <button onClick={fetchLunarData}>Get Moon Phase</button>
    </div>
  );
};

export default LunarPhaseDisplay;

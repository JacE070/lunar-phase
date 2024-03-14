import React, { useState, useEffect } from 'react';
import { getLunarData } from '../services/lunarService';
// import { CircleLoader } from 'react-spinners/CircleLoader';
import ClipLoader from "react-spinners/ClipLoader";

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
        alert('Location access denied. Defaulting to nearest major city.');
        setLocationAllowed(false);
        // Handle the case when the user denies geolocation access
      }
    );
  }, []);

  return (
    <div>
      {isLoading ? (
        <ClipLoader
        color="#36d7b7"
        loading
        speedMultiplier={0}
        />  
      ) : lunarData ? (
        <div>
          {/* <h2>{lunarData.phaseName}</h2> */}
          <img src={lunarData.imageUrl} alt="Moon phase" />
        </div>
      ) : null}
      <input type="date" value={date} onChange={handleDateChange} />
      <button onClick={fetchLunarData}>Get Moon Phase</button>
    </div>
  );
};

export default LunarPhaseDisplay;

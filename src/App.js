import React from 'react';
import LunarPhaseDisplay from './components/LunarPhaseDisplay';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Get the Current Lunar Phase!</h1>
      </header>
      <main>
        <LunarPhaseDisplay />
        <p>
          This app uses your location to display the lunar phase given a date. If you deny location access, it will default to Los Angeles.
        </p>
      </main>
      <footer>
        <p>API from https://docs.astronomyapi.com/</p>
      </footer>
    </div>
  );
}

export default App;

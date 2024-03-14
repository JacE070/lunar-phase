import React from 'react';
import LunarPhaseDisplay from './components/LunarPhaseDisplay';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Lunar Phase Information</h1>
      </header>
      <main>
        <LunarPhaseDisplay />
      </main>
      <footer>
        <p>API from https://docs.astronomyapi.com/</p>
      </footer>
    </div>
  );
}

export default App;

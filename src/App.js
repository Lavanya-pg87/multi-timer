// src/App.js
import React, { useState } from 'react';
import Timer from './Timer';
import './App.css';

const App = () => {
  const [timers, setTimers] = useState([]);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
    if (totalSeconds > 0) {
      const newTimer = { id: Date.now(), duration: totalSeconds };
      setTimers([...timers, newTimer]);
    }
  };

  const handleRemove = (id) => {
    setTimers(timers.filter(timer => timer.id !== id));
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          Hours:
          <input type="number" value={hours} onChange={(e) => setHours(Number(e.target.value))} min="0" required />
        </label>
        <label>
          Minutes:
          <input type="number" value={minutes} onChange={(e) => setMinutes(Number(e.target.value))} min="0" max="59" required />
        </label>
        <label>
          Seconds:
          <input type="number" value={seconds} onChange={(e) => setSeconds(Number(e.target.value))} min="0" max="59" required />
        </label>
        <button type="submit">Start New Timer</button>
      </form>
      <div id="activeTimers">
        {timers.map(timer => (
          <Timer key={timer.id} id={timer.id} duration={timer.duration} onRemove={handleRemove} />
        ))}
      </div>
    </div>
  );
};

export default App;

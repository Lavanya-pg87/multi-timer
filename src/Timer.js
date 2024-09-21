// src/Timer.js
import React, { useState, useEffect } from 'react';

const Timer = ({ id, duration, onRemove }) => {
  const [remainingTime, setRemainingTime] = useState(duration);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isActive) return;

    const intervalId = setInterval(() => {
      setRemainingTime(prevTime => {
        if (prevTime <= 1) {
          clearInterval(intervalId);
          setIsActive(false);
          playAlert();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isActive]);

  const playAlert = () => {
    const audio = new Audio('alert.mp3');
    audio.play();
  };

  const formatTime = (time) => {
    const hrs = Math.floor(time / 3600);
    const mins = Math.floor((time % 3600) / 60);
    const secs = time % 60;
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <div className={`timer ${!isActive ? 'ended' : ''}`}>
      <span className="time">{formatTime(remainingTime)}</span>
      <button onClick={() => onRemove(id)}>Stop Timer</button>
    </div>
  );
};

export default Timer;

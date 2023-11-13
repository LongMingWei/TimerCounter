import React from 'react';
import { useState, useEffect } from 'react';

function App() {
    const [mode, setMode] = useState(0);

    function SwitchMode() {
        setMode(prevMode => (prevMode === 0 ? 1 : 0));
    }

    return (
        <div>
            {mode === 0 ? <App1 /> : <App2 />}
            <div className='switch'>
              <button onClick={SwitchMode}>Switch Mode</button>
            </div>           
        </div>
    );
}

function App1() {
  const [time, setTime] = useState(0);
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!paused) {
        setTime((prevTime) => prevTime + 1);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [paused]);

  function Start() {
    setPaused((prevPaused) => !prevPaused);
  }

  function Reset() {
    setTime(0);
  }

  const color = paused ? '#ffff00' : '#00ff00';

  return (
    <div className="App">
      <h1>Stopwatch</h1>
      <h2 style={{ color }}>{time}</h2>
      <div className='buttons'>
        <button onClick={Start}>Start/Stop</button>
        <button onClick={Reset}>Reset</button>
      </div>
    </div>
  );
}

function App2() {
  const [count, setCount] = useState(0);
  const [increasing, setIncreasing] = useState(true);
  const [paused, setPaused] = useState(false);
  const [pause, setPause] = useState("Running");

  useEffect(() => {
    if (paused) setPause(pause => "Paused");
    else if (increasing) setPause(pause => "Counting Up");
    else setPause(pause => "Counting Down");

    const interval = setInterval(Add, 1000);
    return () => clearInterval(interval);
  }, [count, increasing, paused]);

  function Add() {
    if (!paused) {
      if (increasing) setCount((count) => count + 1);
      else setCount((count) => count - 1);
    }
  }

  function Plus() {
    setIncreasing((increasing) => true);
  }

  function Minus() {
    setIncreasing((increasing) => false);
  }

  function Pause() {
    setPaused((paused) => !paused);
  }

  const color = paused ? '#ffff00' : increasing ? '#00ff00' : '#ff0000';

  return (
    <div className="App">
      <h1>Counter</h1>
      <h2 style={{ color }}>{count}\n{pause}</h2>
      <div className='buttons'>
        <button onClick={Plus}>Count Up</button>
        <button onClick={Minus}>Count Down</button>
        <button onClick={Pause}>Stop/Continue</button>
      </div>
    </div>
  );
}

export default App;

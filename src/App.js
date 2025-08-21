import React, { useState } from 'react';
import './App.css';
import MathGame from './components/MathGame';

function App() {
  const [isWarning, setIsWarning] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    setGameStarted(true);
  };

  const goHome = () => {
    setGameStarted(false);
  };

  if (!gameStarted) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>4교시 수학시간</h1>
          <p>10초 안에 정답을 맞추지 못하면...</p>
        </header>
        <main className="home-main">
          <div className="start-container">
            <button className="start-btn" onClick={startGame}>
              게임 시작
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={`App ${isWarning ? 'warning' : ''}`}>
      <header className="App-header">
        <button className="home-btn" onClick={goHome}>
          홈으로
        </button>
        <h1>4교시 수학시간</h1>
        <p>10초 안에 정답을 맞추지 못하면...</p>
      </header>

      <main>
        <MathGame onWarning={setIsWarning} />
      </main>
    </div>
  );
}

export default App;

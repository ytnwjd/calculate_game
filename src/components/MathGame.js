import React, { useState, useEffect } from 'react';
import './MathGame.css';

const MathGame = () => {
  const [problem, setProblem] = useState({ num1: 0, num2: 0, num3: 0, operator1: '+', operator2: '+', answer: 0 });
  const [userAnswer, setUserAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameState, setGameState] = useState('playing');

  const [showImage, setShowImage] = useState(false);
  const [randomImage, setRandomImage] = useState('');
  const [audio] = useState(new Audio('/audio/screaming.mp3'));

  const generateProblem = () => {
    
    const problems = [
      { num1: 312, num2: 456, num3: 123, operator1: '+', operator2: '-', answer: 645 },
      { num1: 456, num2: 210, num3: 301, operator1: '-', operator2: '+', answer: 547 },
      { num1: 999, num2: 112, num3: 8, operator1: '-', operator2: '/', answer: 985 },
      { num1: 789, num2: 11, num3: 20, operator1: '-', operator2: '*', answer: 569 },
      { num1: 123, num2: 456, num3: 789, operator1: '+', operator2: '-', answer: -210 },    
      { num1: 900, num2: 112, num3: 2, operator1: '-', operator2: '/', answer: 844 },
      { num1: 543, num2: 210, num3: 150, operator1: '+', operator2: '-', answer: 603 },      
      { num1: 789, num2: 11, num3: 20, operator1: '-', operator2: '*', answer: 569 },
      { num1: 789, num2: 3, num3: 120, operator1: '/', operator2: '+', answer: 263 },
      { num1: 300, num2: 10, num3: 250, operator1: '/', operator2: '+', answer: 280 },   
      { num1: 890, num2: 45, num3: 123, operator1: '-', operator2: '+', answer: 968 },   
      { num1: 678, num2: 91, num3: 542, operator1: '+', operator2: '-', answer: 227 },   
      { num1: 333, num2: 4, num3: 492, operator1: '*', operator2: '-', answer: 840 },   
      { num1: 450, num2: 15, num3: 101, operator1: '/', operator2: '+', answer: 131 },   
    ];

    const randomIndex = Math.floor(Math.random() * problems.length);
    const selectedProblem = problems[randomIndex];

    setProblem(selectedProblem);
  };

  const getRandomImage = () => {
    const images = [
      '/images/images2.jpeg',
      '/images/img3.jpg',
      '/images/images1.jpeg',
      '/images/images4.jpg',
      '/images/img.jpeg',
      '/images/img2.jpg',
      '/images/images5.jpeg'
    ];
    const randomIndex = Math.floor(Math.random() * images.length);
    setRandomImage(images[randomIndex]);
  };

  const resetGame = () => {
    setTimeLeft(10);
    setUserAnswer('');
    setGameState('playing');
    setShowImage(false);
    generateProblem();
  };

  const checkAnswer = () => {
    const userNum = parseInt(userAnswer);
    if (userNum === problem.answer) {
      setGameState('success');
      setShowImage(true);      
    } else {
      setGameState('failed');
      getRandomImage();
      setShowImage(true);
      audio.play().catch(e => console.log('Audio play failed:', e));
      setTimeout(() => {
        resetGame();
      }, 4500);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && gameState === 'playing') {
      checkAnswer();
    }
  };

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === 'playing') {
      setGameState('failed');
      getRandomImage();
      setShowImage(true);
      audio.play().catch(e => console.log('Audio play failed:', e));
      setTimeout(() => {
        resetGame();
      }, 4500);
    }
  }, [timeLeft, gameState]);

  useEffect(() => {
    if (onWarning) {
      const shouldWarn = timeLeft <= 4 && gameState === 'playing';
      onWarning(shouldWarn);
    }
  }, [timeLeft, gameState, onWarning]);

  // 초기 문제 생성
  useEffect(() => {
    generateProblem();
  }, []);

  return (
    <div className="math-game">
              <div className="game-info">
          {gameState === 'playing' && <div className="timer">남은 시간: {timeLeft}초</div>}
        </div>

      {gameState === 'playing' && (
        <div className="game-content">
          <div className="problem">
            <h2>{problem.num1} {problem.operator1} {problem.num2} {problem.operator2} {problem.num3} = ?</h2>
          </div>
          <div className="input-section">
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="정답을 입력하세요"
              className="answer-input"
            />
            <button onClick={checkAnswer} className="submit-btn">
              제출
            </button>
          </div>
        </div>
      )}

      {gameState === 'success' && (
        <div className="result success">
          <div className="image">
            <img src="/images/8.png" alt="성공 이미지" />
          </div>
        </div>
      )}

      {gameState === 'failed' && (
        <div className="result failed">
          {showImage && (
            <div className="random-image">
              <img src={randomImage} alt="공포의 이미지" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MathGame; 
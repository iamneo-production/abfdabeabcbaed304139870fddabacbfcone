import React, { useState, useEffect } from 'react';

export const colors = [
      { name: 'Red', code: '#FF0000' },
      { name: 'Blue', code: '#0000FF' },
      { name: 'Green', code: '#00FF00' },
      { name: 'Yellow', code: '#FFFF00' },
      { name: 'Purple', code: '#800080' },
      { name: 'Orange', code: '#FFA500' },
      { name: 'Pink', code: '#FFC0CB' },
      { name: 'Cyan', code: '#00FFFF' },
   
];

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const ColorMatcher = () => {
  const [currentColor, setCurrentColor] = useState(getRandomColor());
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);
  const [timerActive, setTimerActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false); // Added state for game won

  const handleColorSelection = (selectedColor) => {
    if (!gameOver && !gameWon) { // Check for game over and game won conditions
      if (timerActive && selectedColor.name === currentColor.name) {
        setScore(score + 1);
      } else {
        setScore(score - 1);
      }
      setTimerActive(false);
      setCurrentColor(getRandomColor());
    }
  };

  useEffect(() => {
    if (timeLeft > 0 && timerActive) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
    if (timeLeft === 0 && !gameWon) { // Display game over only if not won
      setTimerActive(false);
      setGameOver(true);
    }
  }, [timeLeft, timerActive, gameWon]);

  useEffect(() => {
    if (!gameOver && !gameWon && !timerActive) { // Start timer only if not over or won
      setTimerActive(true);
      setTimeLeft(5);
    }
    if (score >= 10 && !gameOver && !gameWon) { // Set game won state
      setGameWon(true);
      setTimerActive(false);
    }
  }, [currentColor, gameOver, timerActive, gameWon, score]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1>Color Matcher Game</h1>
      {gameOver ? (
        <p data-testid="lost-message" style={{ color: 'red', fontSize: '24px' }}>Game Over! You lost!</p>
      ) : (
        <>
          <p data-testid="time-left">Time left: {timeLeft} seconds</p>
          <p data-testid="score">Score: {score}</p>
          <div
            data-testid="color-square"
            style={{
              width: '200px',
              height: '200px',
              backgroundColor: currentColor.code,
              borderRadius: '50%',
            }}
          />
          {/* <h2>Color: {currentColor.name}</h2> */}
          <div>
            {colors.map((color) => (
              <button
                key={color.name}
                onClick={() => handleColorSelection(color)}
                style={{
                  borderRadius: '50%',
                  width: '100px',
                  height: '100px',
                  margin: '10px',
                }}
              >
                {color.name}
              </button>
            ))}
          </div>
          {gameWon && (
            <p data-testid="win-message" style={{ color: 'green', fontSize: '24px' }}>You won!</p>
          )}
        </>
      )}
    </div>
  );
};

export default ColorMatcher;

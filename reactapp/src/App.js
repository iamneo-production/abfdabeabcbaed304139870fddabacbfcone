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
  {/* Write a  function that returns a random color from the colors array */}
  
  return colors[randomIndex];
};

const ColorMatcher = () => {
  const [currentColor, setCurrentColor] = useState(getRandomColor());
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);
  const [timerActive, setTimerActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  const handleColorSelection = (selectedColor) => {
    {/* Write a function that updates the score based on the selected color
     Check if the game is not over and not won yet
   
       Check if the timer is active and if the selected color matches the current color
     
         Increment the score by 1 if the selected color is correct
       
         Decrement the score by 1 if the selected color is incorrect
       
       Deactivate the timer
     
    Set a new random color as the current color */}
  };

  useEffect(() => {
    if (timeLeft > 0 && timerActive) {
      const timer = setTimeout(() => {

        {/* Write a Code to decrease the time left by 1 second */}
        
      }, 1000);
      return () => clearTimeout(timer);
    }
    {/* Check if the time has reached 0 and the game is not won */}

      {/* Deactivate the timer and set the game as over */}
      
    }
  }, [timeLeft, timerActive, gameWon]);

  useEffect(() => {
   {/* }Write a Code to Check if the game is not over, not won, and the timer is not active */}
   
     {/* Write a Code to Activate the timer and set the initial time left */} 
   
  }
    if (score >= 10 && !gameOver && !gameWon) { 
      setGameWon(true);
      setTimerActive(false);
    }
  }, [currentColor, gameOver, timerActive, gameWon, score]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      {/* Add title as "Color Matcher Game" using h1 */}
    
      {gameOver ? (

        {/* Write a paragraph element that displays the "Game Over! You lost!" message when the game is over */}
          {/* Set the data-testid attribute to "lost-message" for testing */}
          {/* Apply inline styles to change the text color to red and set font size to 24 pixels */}
        {/* Display the message "Game Over! You lost!" */}

      ) : (
        <>
           
          {/* Write a paragraph element that displays the remaining time */}
            {/* Set the data-testid attribute to "time-left" */}
            {/* Display the text "Time left: " followed by the value of the "timeLeft" variable */}

          {/* Write a paragraph element that displays the player's score */}
            {/* Set the data-testid attribute to "score" */}
            {/* Display the text "Score: " followed by the value of the "score" variable */}

            <div
            data-testid="color-square"
            style={{
              width: '200px',
              height: '200px',
              backgroundColor: currentColor.code,
              borderRadius: '50%',
            }}
          />
        
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
            {/* Write a paragraph element that displays the "You won!" message when the game is won */}
              {/* Set the data-testid attribute to "win-message"  */}
                 {/* Apply inline styles to change the text color to green and set font size to 24 pixels */}
            {/* Display the message "You won!" */}
          )}
        </>
      )}
    </div>
  );
};

export default ColorMatcher;

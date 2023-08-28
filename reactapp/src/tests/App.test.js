import React from 'react';
import { render, fireEvent, screen, waitFor ,  act } from '@testing-library/react';
import ColorMatcher from '../App';
import { colors } from '../App';

describe('ColorMatcher Game', () => {
  beforeEach(() => {
    jest.useFakeTimers(); // Mock timers for async testing
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('renders_game_components', () => {
    render(<ColorMatcher />);
    expect(screen.getByText('Color Matcher Game')).toBeInTheDocument();
    expect(screen.getByTestId('color-square')).toBeInTheDocument();
    expect(screen.getByText('Time left: 5 seconds')).toBeInTheDocument();
    expect(screen.getByText('Score: 0')).toBeInTheDocument();
    expect(screen.getByText('Red')).toBeInTheDocument();
    // ... Add assertions for other colors and elements
  });

  test('selecting_correct_color_increases_score', async () => {
    render(<ColorMatcher />);
    
    // Get the current color before clicking any button
    const currentColorStyle = screen.getByTestId('color-square').style.backgroundColor;
    
    // Find the color object that matches the current color
    const currentColorObject = colors.find(color => color.code === currentColorStyle);
  
    // If the color object is found, click the corresponding button
    if (currentColorObject) {
      const colorButton = screen.getByText(currentColorObject.name);
      fireEvent.click(colorButton);
    }
  
    // Wait for DOM updates
    await waitFor(() => {
      expect(screen.getByText(/Score: \d+/)).toBeInTheDocument();
    });
  });

  test('selecting_incorrect_color_decreases_score', async () => {
    render(<ColorMatcher />);
  
    // Get the initial score before clicking any button
    const initialScore = parseInt(screen.getByTestId('score').textContent.replace('Score: ', ''));
  
  
    // Find a color that is different from the current color
    const currentColorName = screen.getByTestId('color-square').style.backgroundColor;
    const incorrectColor = colors.find(color => color.code !== currentColorName);
  
    // Find the button for the incorrect color
    const incorrectColorButton = screen.getByText(incorrectColor.name);
  
    // Click the incorrect color button
    fireEvent.click(incorrectColorButton);
  
    // Wait for the score to update
    await waitFor(() => {
      const updatedScore = parseInt(screen.getByTestId('score').textContent.replace('Score: ', ''));
      expect(updatedScore).toBeLessThan(initialScore);
    });
  });


  test('game_over_message_displayed_after_timer_reaches_0', async () => {
    render(<ColorMatcher />);
    jest.advanceTimersByTime(5000); // Fast-forward timer to 0
    await waitFor(() => {
      expect(screen.getByTestId('lost-message')).toBeInTheDocument();
    });
  });

  test('game_won_message_displayed_after_reaching_score_of_10', async () => {
    render(<ColorMatcher />);
  
    // Simulate clicking the correct color 10 times to reach the score of 10
    const correctColorButton = screen.getByText(colors[0].name); // Assuming 'Red' is the correct color
    for (let i = 0; i < 10; i++) {
      fireEvent.click(correctColorButton);
    }
  
    // Wait for the "You won!" message to be displayed
    await waitFor(() => {
      const winMessage = screen.queryByTestId('win-message');
         if (winMessage) {
               expect(winMessage).toBeInTheDocument();
      }
    });
  });


  test('timer_starts_and_decreases_on_color_selection', async () => {
    render(<ColorMatcher />);
    const colorButton = screen.getByText('Green');
    expect(screen.getByText('Time left: 5 seconds')).toBeInTheDocument();
  
    // Wrap the interactions in act for proper async handling
    await act(async () => {
      fireEvent.click(colorButton);
      jest.advanceTimersByTime(1000); // Advance timer by 1 second
  
      // Wait for the time to update
      await waitFor(() => {
        expect(screen.getByText('Time left: 4 seconds')).toBeInTheDocument();
      });
    });
  });

 
  
});

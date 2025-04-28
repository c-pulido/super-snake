import React, { useEffect, useRef, useState } from 'react';
import './GameBoard.css'; // Correct CSS file

const CELL_SIZE = 20;
const WIDTH = 20;
const HEIGHT = 20;

const GameBoard = ({ direction, gameState, onGameOver }) => {
  const [snake, setSnake] = useState([[10, 10]]);
  const [food, setFood] = useState(generateFood());
  const intervalRef = useRef();
  const [score, setScore] = useState(0);

  function generateFood() {
    const x = Math.floor(Math.random() * WIDTH);
    const y = Math.floor(Math.random() * HEIGHT);
    return [x, y];
  }

  useEffect(() => {
    if (gameState === 'playing') {
      intervalRef.current = setInterval(moveSnake, 200);
    }
    return () => clearInterval(intervalRef.current);
  }, [snake, direction, gameState]);

  useEffect(() => {
    if (gameState === 'playing') {
      setSnake([[10, 10]]);
      setFood(generateFood());
      setScore(0);
    }
  }, [gameState]);

  const moveSnake = () => {
    const head = snake[0];
    let newHead;

    switch (direction) {
      case 'UP':
        newHead = [head[0], head[1] - 1];
        break;
      case 'DOWN':
        newHead = [head[0], head[1] + 1];
        break;
      case 'LEFT':
        newHead = [head[0] - 1, head[1]];
        break;
      case 'RIGHT':
      default:
        newHead = [head[0] + 1, head[1]];
        break;
    }

    if (
      newHead[0] < 0 || newHead[1] < 0 ||
      newHead[0] >= WIDTH || newHead[1] >= HEIGHT ||
      snake.some(([sx, sy]) => sx === newHead[0] && sy === newHead[1])
    ) {
      clearInterval(intervalRef.current);
      onGameOver(score);
      return;
    }

    const ateFood = newHead[0] === food[0] && newHead[1] === food[1];
    const newSnake = ateFood
      ? [newHead, ...snake]
      : [newHead, ...snake.slice(0, -1)];

    if (ateFood) {
      setFood(generateFood());
      setScore(score + 1);
    }

    setSnake(newSnake);
  };

  return (
    <div className="game-board"> {/* FIXED classname */}
      {[...Array(WIDTH * HEIGHT)].map((_, i) => {
        const x = i % WIDTH;
        const y = Math.floor(i / WIDTH);
        const isSnake = snake.some(([sx, sy]) => sx === x && sy === y);
        const isFood = x === food[0] && y === food[1];

        return (
          <div
            key={i}
            className={`cell ${isSnake ? 'snake' : isFood ? 'food' : ''}`}
          />
        );
      })}
    </div>
  );
};

export default GameBoard;

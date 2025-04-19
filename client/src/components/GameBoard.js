// client/src/components/GameBoard.js
import React, { useEffect, useRef, useState } from 'react';

const CELL_SIZE = 20;
const WIDTH = 20;
const HEIGHT = 20;

const GameBoard = ({ direction }) => {
  const [snake, setSnake] = useState([[10, 10]]);
  const [gameOver, setGameOver] = useState(false);
  const intervalRef = useRef();

  useEffect(() => {
    intervalRef.current = setInterval(moveSnake, 200);
    return () => clearInterval(intervalRef.current);
  }, [snake, direction]);

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
      newHead[0] >= WIDTH || newHead[1] >= HEIGHT
    ) {
      setGameOver(true);
      clearInterval(intervalRef.current);
      return;
    }

    const newSnake = [newHead, ...snake.slice(0, -1)];
    setSnake(newSnake);
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${WIDTH}, ${CELL_SIZE}px)`,
      gridTemplateRows: `repeat(${HEIGHT}, ${CELL_SIZE}px)`,
      border: '2px solid #000',
      margin: '20px auto',
      width: WIDTH * CELL_SIZE,
      height: HEIGHT * CELL_SIZE,
    }}>
      {[...Array(WIDTH * HEIGHT)].map((_, i) => {
        const x = i % WIDTH;
        const y = Math.floor(i / WIDTH);
        const isSnake = snake.some(([sx, sy]) => sx === x && sy === y);

        return (
          <div
            key={i}
            style={{
              width: CELL_SIZE,
              height: CELL_SIZE,
              backgroundColor: isSnake ? 'green' : 'white',
              border: '1px solid #ccc',
            }}
          />
        );
      })}
      {gameOver && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: '#fff',
          padding: '20px',
          border: '2px solid #000',
          zIndex: 1
        }}>
          <h2>Game Over</h2>
          <button onClick={() => window.location.reload()}>Replay</button>
        </div>
      )}
    </div>
  );
};

export default GameBoard;

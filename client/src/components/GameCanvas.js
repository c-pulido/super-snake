import React, { useRef, useEffect, useState } from 'react';

const canvasWidth = 400;
const canvasHeight = 400;
const blockSize = 20;

const GameCanvas = ({ onGameOver }) => {
  const canvasRef = useRef(null);
  const [snake, setSnake] = useState([{ x: 200, y: 200 }]);
  const [food, setFood] = useState(generateFood());
  const [direction, setDirection] = useState({ x: blockSize, y: 0 });
  const [isGameOver, setIsGameOver] = useState(false);

  function generateFood() {
    return {
      x: Math.floor(Math.random() * (canvasWidth / blockSize)) * blockSize,
      y: Math.floor(Math.random() * (canvasHeight / blockSize)) * blockSize,
    };
  }

  function handleKeyDown(e) {
    switch (e.key) {
      case 'ArrowUp':
        if (direction.y === 0) setDirection({ x: 0, y: -blockSize });
        break;
      case 'ArrowDown':
        if (direction.y === 0) setDirection({ x: 0, y: blockSize });
        break;
      case 'ArrowLeft':
        if (direction.x === 0) setDirection({ x: -blockSize, y: 0 });
        break;
      case 'ArrowRight':
        if (direction.x === 0) setDirection({ x: blockSize, y: 0 });
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    const context = canvasRef.current.getContext('2d');
    document.addEventListener('keydown', handleKeyDown);

    const interval = setInterval(() => {
      if (isGameOver) return;

      const newSnake = [...snake];
      const head = { ...newSnake[0] };
      head.x += direction.x;
      head.y += direction.y;

      // Collision with wall
      if (
        head.x < 0 ||
        head.x >= canvasWidth ||
        head.y < 0 ||
        head.y >= canvasHeight
      ) {
        setIsGameOver(true);
        onGameOver();
        return;
      }

      // Collision with self
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setIsGameOver(true);
        onGameOver();
        return;
      }

      newSnake.unshift(head);

      // Eating food
      if (head.x === food.x && head.y === food.y) {
        setFood(generateFood());
      } else {
        newSnake.pop();
      }

      setSnake(newSnake);

      // Clear and redraw
      context.clearRect(0, 0, canvasWidth, canvasHeight);
      context.fillStyle = 'green';
      newSnake.forEach(segment => {
        context.fillRect(segment.x, segment.y, blockSize, blockSize);
      });

      // Draw food
      context.fillStyle = 'red';
      context.fillRect(food.x, food.y, blockSize, blockSize);
    }, 100);

    return () => {
      clearInterval(interval);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [snake, direction, food, isGameOver]);

  return <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />;
};

export default GameCanvas;

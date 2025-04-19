import React, { useState, useEffect } from "react";
import GameBoard from "../components/GameBoard";
import ReplayOverlay from "../components/ReplayOverlay";

const LiveGame = () => {
  const [gameState, setGameState] = useState("playing"); // "playing" or "gameover"
  const [direction, setDirection] = useState("RIGHT");

  const handleGameOver = () => {
    setGameState("gameover");
  };

  const handleReplay = () => {
    setDirection("RIGHT");
    setGameState("playing");
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case "ArrowUp":
        if (direction !== "DOWN") setDirection("UP");
        break;
      case "ArrowDown":
        if (direction !== "UP") setDirection("DOWN");
        break;
      case "ArrowLeft":
        if (direction !== "RIGHT") setDirection("LEFT");
        break;
      case "ArrowRight":
        if (direction !== "LEFT") setDirection("RIGHT");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction]);

  return (
    <div>
      <GameBoard gameState={gameState} direction={direction} onGameOver={handleGameOver} />
      {gameState === "gameover" && <ReplayOverlay onReplay={handleReplay} />}
    </div>
  );
};

export default LiveGame;

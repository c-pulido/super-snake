// client/src/pages/LiveGame.js
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import GameBoard from "../components/GameBoard";
import ReplayOverlay from "../components/ReplayOverlay";

const LiveGame = () => {
  const [gameState, setGameState] = useState("playing");
  const [direction, setDirection] = useState("RIGHT");
  const guestCreatedRef = useRef(false); // prevents multiple guest creations

  const createGuestUser = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/auth/guest");
      console.log("✅ Guest user created: ", response.data);
    } catch (error) {
      console.error("❌ Failed to create guest user \n", error);
    }
  };

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
    if (!guestCreatedRef.current) {
      guestCreatedRef.current = true;
      createGuestUser();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction]);

  return (
    <div>
      <GameBoard
        gameState={gameState}
        direction={direction}
        onGameOver={handleGameOver}
      />
      {gameState === "gameover" && <ReplayOverlay onReplay={handleReplay} />}
    </div>
  );
};

export default LiveGame;

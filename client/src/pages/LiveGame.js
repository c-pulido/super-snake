import React, { useState, useEffect, useRef } from "react";
import GameBoard from "../components/GameBoard";
import ReplayOverlay from "../components/ReplayOverlay";
import axios from "axios";

const LiveGame = () => {
  const [gameState, setGameState] = useState("playing");
  const [direction, setDirection] = useState("RIGHT");
  const [guestUser, setGuestUser] = useState(null);
  const guestCreatedRef = useRef(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);  // ✅ Used to refresh leaderboard

  useEffect(() => {
    if (!guestCreatedRef.current) {
      guestCreatedRef.current = true;
      axios.post("http://localhost:8080/api/auth/guest")
        .then(res => {
          console.log("✅ Guest user created:", res.data);
          setGuestUser(res.data);
        })
        .catch(err => {
          console.error("❌ Failed to create guest user", err);
        });
    }
  }, []);

  const handleGameOver = (finalScore) => {
    setGameState("gameover");

    if (guestUser) {
      axios.post("http://localhost:8080/api/players", {
        id: guestUser.id,
        score: finalScore,
      })
        .then(() => {
          console.log("✅ Score saved successfully");
          setRefreshTrigger(prev => prev + 1);  // ✅ Trigger leaderboard refresh
        })
        .catch((err) => {
          console.error("❌ Failed to save score", err);
        });
    } else {
      console.warn("⚠️ Guest user not ready yet");
    }
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
    <div style={{ position: "relative" }}>
      <GameBoard
        gameState={gameState}
        direction={direction}
        onGameOver={handleGameOver}
      />
      <ReplayOverlay
        show={gameState === "gameover"}
        onReplay={handleReplay}
        refreshTrigger={refreshTrigger}  // ✅ Pass to overlay to trigger re-fetch
      />
    </div>
  );
};

export default LiveGame;

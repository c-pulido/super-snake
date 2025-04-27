import React, { useState, useEffect, useRef } from "react";
import GameBoard from "../components/GameBoard";
import ReplayOverlay from "../components/ReplayOverlay";
import axios from "axios";

const LiveGame = ({ user }) => { // Receive logged-in user
  const [gameState, setGameState] = useState("playing");
  const [direction, setDirection] = useState("RIGHT");
  const [guestUser, setGuestUser] = useState(null);
  const guestCreatedRef = useRef(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    if (!user && !guestCreatedRef.current) { //  Only create guest if NOT logged in
      guestCreatedRef.current = true;
      axios.post("http://localhost:8080/api/auth/guest")
        .then(res => {
          console.log(" Guest user created:", res.data);
          setGuestUser(res.data);
        })
        .catch(err => {
          console.error("❌ Failed to create guest user", err);
        });
    }
  }, [user]);

  const handleGameOver = (finalScore) => {
    setGameState("gameover");

    const currentUser = user || guestUser; // Use logged-in user OR guest

    if (currentUser) {
      axios.post("http://localhost:8080/api/players", {
        id: currentUser.id,
        score: finalScore,
      })
        .then(() => {
          console.log("✅Score saved successfully");
          setRefreshTrigger(prev => prev + 1);
        })
        .catch((err) => {
          console.error("Failed to save score", err);
        });
    } else {
      console.warn(" No user ready yet");
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
      {/* Main GameBoard and ReplayOverlay */}
      <GameBoard
        gameState={gameState}
        direction={direction}
        onGameOver={handleGameOver}
      />
      <ReplayOverlay
        show={gameState === "gameover"}
        onReplay={handleReplay}
        refreshTrigger={refreshTrigger}
      />
    </div>
  );
};

export default LiveGame;

import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import GameBoard from "../components/GameBoard";
import ReplayOverlay from "../components/ReplayOverlay";
import axios from "axios";

const LiveGame = ({ user }) => {
  const [gameState, setGameState] = useState("playing");
  const [direction, setDirection] = useState("RIGHT");
  const [guestUser, setGuestUser] = useState(null);
  const guestCreatedRef = useRef(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    if (!user && !guestCreatedRef.current) {
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
  }, [user]);

  const handleGameOver = (finalScore) => {
    setGameState("gameover");
    const currentUser = user || guestUser;
    if (currentUser) {
      axios.post("http://localhost:8080/api/players", {
        id: currentUser.id,
        score: finalScore,
      })
        .then(() => {
          console.log("✅ Score saved successfully");
          setRefreshTrigger(prev => prev + 1);
        })
        .catch((err) => {
          console.error("❌ Failed to save score", err);
        });
    } else {
      console.warn("⚠️ No user ready yet");
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
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Top bar */}
      <div className="top-bar">
        {user ? (
          <div className="user-info">
            Logged in as {user.username}
            <button className="logout-button" onClick={() => window.location.href = "/"}>Logout</button>
          </div>
        ) : (
          <div className="auth-links">
            <Link to="/login">Login</Link> | <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </div>

      {/* Game area */}
      <div className="game-area">
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
    </div>
  );
};

export default LiveGame;

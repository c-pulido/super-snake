import React from 'react';
import MiniLeaderboard from './MiniLeaderboard';
import './ReplayOverlay.css';

const ReplayOverlay = ({ show, onReplay, refreshTrigger }) => {
  if (!show) return null;

  return (
    <div className="replay-overlay">
      <div className="overlay-content">
        <h1 className="game-over-text">GAME OVER!</h1>
        <MiniLeaderboard refreshTrigger={refreshTrigger} />
        <button className="replay-button" onClick={onReplay}>Replay</button>
      </div>
    </div>
  );
};

export default ReplayOverlay;

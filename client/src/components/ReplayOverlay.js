import React from 'react';

function ReplayOverlay({ onReplay }) {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0,0,0,0.6)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      color: 'white'
    }}>
      <h2>Game Over</h2>
      <button onClick={onReplay} style={{
        padding: '10px 20px',
        fontSize: '16px',
        marginTop: '10px',
        cursor: 'pointer'
      }}>
        Play Again
      </button>
    </div>
  );
}

export default ReplayOverlay;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MiniLeaderboard = ({ refreshTrigger }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/users/top')
      .then(res => setUsers(res.data))
      .catch(err => console.error("Failed to fetch leaderboard:", err));
  }, [refreshTrigger]); // 👈 re-fetch when this value changes

  const formatUsername = (username) => {
    if (username.startsWith("Guest")) {
      const numberPart = username.replace("Guest", "");
      return `Guest ${parseInt(numberPart, 10)}`;
    }
    return username;
  };

  return (
    <div className="mini-leaderboard">
      <h2>Top Scores</h2>
      <ol className="leaderboard-list">
        {users.map((user, index) => (
          <li key={user.id}>
            {index + 1}. {formatUsername(user.username)}: {user.highScore}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default MiniLeaderboard;


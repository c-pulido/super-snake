import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import LiveGame from "./pages/LiveGame";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import './App.css'; // Make sure App.css has the new styles

function App() {
  const [user, setUser] = useState(null); //  Track logged-in user

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <div className="app-container">
        <div className="top-bar">
          {user ? (
            <div className="user-info">
              <span>Logged in as {user.username}</span>
              <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login">Login</Link> | <Link to="/signup">Sign Up</Link>
            </div>
          )}
        </div>
        <Routes>
          <Route path="/" element={<LiveGame user={user} />} />
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

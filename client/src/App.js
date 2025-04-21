import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LiveGame from "./pages/LiveGame";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import './App.css'; // Optional: for shared styling

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<LiveGame />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

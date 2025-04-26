import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Add this
import axios from "axios";

function LoginPage({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate(); // ✅ Add this

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        username,
        password,
      });
      setStatus(`✅ Welcome back, ${res.data.username}!`);
      setUser(res.data); // Save logged-in user
      setTimeout(() => navigate("/"), 1000); // ✅ Go to game page after 1 sec
    } catch (err) {
      console.error(err);
      setStatus("❌ Login failed. Please check your credentials.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", width: "300px" }}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required style={{ marginBottom: "10px", padding: "8px" }} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ marginBottom: "10px", padding: "8px" }} />
        <button type="submit" style={{ padding: "10px", backgroundColor: "#4CAF50", color: "white", border: "none" }}>
          Login
        </button>
      </form>
      {status && <p style={{ marginTop: "1rem" }}>{status}</p>}
    </div>
  );
}

export default LoginPage;

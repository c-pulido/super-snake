import React, { useState } from "react";
import axios from "axios";

function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/auth/signup", {
        username,
        password,
      });
      setStatus(`✅ Successfully registered user: ${res.data.username}`);
      setUsername("");
      setPassword("");
    } catch (err) {
      setStatus("❌ Signup failed. Username might already exist.");
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Press Start 2P, cursive" }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", width: "300px" }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ marginBottom: "10px", padding: "8px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ marginBottom: "10px", padding: "8px" }}
        />
        <button type="submit" className="form-button">
          Register
        </button>
      </form>
      {status && <p style={{ marginTop: "1rem" }}>{status}</p>}
    </div>
  );
}

export default SignupPage;

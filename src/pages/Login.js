// src/Login.js

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login({ setCurrentUser }) {
  // Authentication state managed locally
  let [auth, setAuth] = useState({ username: "", password: "" });
  let [authMessage, setAuthMessage] = useState("");
  const navigate = useNavigate();

  // Helper for input change
  const handleAuthChange = (e) => {
    setAuth((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  async function registerUser(e) {
    e.preventDefault();
    setAuthMessage("Registering...");
    try {
      const resp = await axios.post("http://localhost:5000/auth/register", {
        username: auth.username,
        password: auth.password,
      });
      setAuthMessage(
        resp.data.message || "Registered successfully! Please log in."
      );
    } catch (err) {
      console.error("Register error:", err.response || err.message);
      const msg = err.response?.data?.message || "Register failed";
      setAuthMessage(msg);
    }
  }

  async function loginUser(e) {
    e.preventDefault();
    setAuthMessage("Logging in...");
    try {
      const resp = await axios.post("http://localhost:5000/auth/login", {
        username: auth.username,
        password: auth.password,
      });

      // SUCCESS: Set the user in the App.js state
      const loggedInUsername = auth.username;
      setCurrentUser(loggedInUsername);

      setAuthMessage(resp.data.message || "Login successful. Redirecting...");

      // Automatically navigate to the card creation page
      setTimeout(() => {
        navigate("/create");
      }, 1000); // 1 second delay to display the success message
    } catch (err) {
      console.error("Login error:", err.response || err.message);
      const msg =
        err.response?.data?.message || "Login failed. Invalid credentials.";
      setAuthMessage(msg);
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <div style={{
        padding: 30,
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        borderRadius: 20,
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
      }}>
        <form onSubmit={(e) => e.preventDefault()}>
          <h3 style={{ 
            marginTop: 0, 
            marginBottom: 20, 
            fontSize: "1.8em",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            Login / Register
          </h3>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={auth.username}
            onChange={handleAuthChange}
            style={{
              display: "block",
              width: "100%",
              marginBottom: 15,
              padding: 12,
              borderRadius: 10,
              fontSize: "1em",
              border: "2px solid #e0e0e0",
            }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={auth.password}
            onChange={handleAuthChange}
            style={{
              display: "block",
              width: "100%",
              marginBottom: 15,
              padding: 12,
              borderRadius: 10,
              fontSize: "1em",
              border: "2px solid #e0e0e0",
            }}
          />
          <div
            style={{ display: "flex", gap: 12, justifyContent: "space-between" }}
          >
            <button 
              type="button" 
              onClick={registerUser}
              style={{
                flex: 1,
                padding: "12px 20px",
                borderRadius: 10,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                fontSize: "1em",
                fontWeight: "bold",
                boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                border: "none",
                cursor: "pointer"
              }}
            >
              Register
            </button>
            <button 
              type="submit" 
              onClick={loginUser}
              style={{
                flex: 1,
                padding: "12px 20px",
                borderRadius: 10,
                background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                color: "white",
                fontSize: "1em",
                fontWeight: "bold",
                boxShadow: "0 4px 15px rgba(245, 87, 108, 0.4)",
                border: "none",
                cursor: "pointer"
              }}
            >
              Login
            </button>
          </div>
          {authMessage && (
            <p
              style={{
                marginTop: 15,
                fontSize: "0.9em",
                color: "white",
                background:
                  authMessage.includes("successful") ||
                  authMessage.includes("Registered")
                    ? "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)"
                    : "linear-gradient(135deg, #ee0979 0%, #ff6a00 100%)",
                padding: "12px",
                borderRadius: "8px",
                textAlign: "center",
                fontWeight: "500"
              }}
            >
              {authMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

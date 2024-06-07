import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      alert("User logged in successfully!");
      setError(null);
      navigate("/welcome");
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  const handleForgotPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent. Please check your inbox.");
      setError(null); // Reset error state on successful password reset
    } catch (error) {
      // Handle specific error cases
      switch (error.code) {
        case "auth/invalid-email":
          setError("Invalid email address. Please enter a valid email.");
          break;
        case "auth/user-not-found":
          setError("User with this email address does not exist.");
          break;
        default:
          setError("Failed to send reset email. Please try again later.");
          break;
      }
      console.error("Error sending reset email:", error);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
      <div className="forgot-password">
        <button onClick={handleForgotPassword}>Forgot Password?</button>
      </div>
      <div className="signup-link">
        <a href="/signup">Don't have an account? Signup</a>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // To get the uid from the URL
import 'bootstrap/dist/css/bootstrap.min.css';

const ChangePassword = () => {
  const { uid } = useParams(); // Get uid from URL parameters
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  // Handle form submission for changing password
  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const user = { password }; // Create user object with new password
      await axios.put(`http://localhost:8080/user/change-password/${uid}`, user);
      setMessage("Password changed successfully!");
      setPassword(""); // Clear the password fields
      setConfirmPassword("");
    } catch (error) {
      console.error("Error changing password:", error);
      setMessage("Error changing password.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Change Password</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleChangePassword} className="mb-4">
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Change Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;
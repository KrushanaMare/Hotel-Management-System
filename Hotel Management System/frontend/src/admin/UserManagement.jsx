import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({ uid: "", uname: "", email: "", phoneNumber: "", role: "" });
  const [message, setMessage] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/admin/show-all-users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setMessage("Error fetching users.");
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/admin/add-user", user);
      setMessage("User added successfully!");
      fetchUsers(); // Refresh the user list
      resetForm();
    } catch (error) {
      console.error("Error adding user:", error);
      setMessage("Error adding user.");
    }
  };

  const handleDeleteUser = async (uid) => {
    try {
      await axios.delete(`http://localhost:8080/admin/delete-user/${uid}`);
      setMessage("User deleted successfully!");
      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error("Error deleting user:", error);
      setMessage("Error deleting user.");
    }
  };

  const resetForm = () => {
    setUser({ uid: "", uname: "", email: "", phoneNumber: "", role: "" });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">User Management</h2>
      <form onSubmit={handleAddUser} className="mb-4">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={user.uname}
            onChange={(e) => setUser({ ...user, uname: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Phone Number"
            value={user.phoneNumber}
            onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <select
            className="form-select"
            value={user.role}
            onChange={(e) => setUser({ ...user, role: e.target.value })}
            required
          >
            <option value="">Select Role</option>
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Add User</button>
      </form>
      {message && <div className="alert alert-info">{message}</div>}
      <h4>All Users</h4>
      <div className="row">
        {users.map((user) => (
          <div key={user.uid} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{user.uname}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{user.email}</h6>
                <p className="card-text"><strong>Phone:</strong> {user.phoneNumber}</p>
                <p className="card-text"><strong>Role:</strong> {user.role}</p>
                <button className="btn btn-danger" onClick={() => handleDeleteUser(user.uid)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;
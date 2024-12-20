import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container">
        <a className="navbar-brand" href="#">Admin Dashboard</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/user-management">User Management</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/room-management">Room Management</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/booking-management">Booking Management</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css'; // Custom CSS file

const Home = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="#">LTTS HOTEL</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="/login">Login</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/register">Register</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Image */}
      <center><div className="hero-image">
        <img src="about_banner.jpg" alt="Hotel" className="img-fluid" />
      </div></center>

      {/* Available Rooms Section */}
      <div className="container my-5">
        <h2 className="text-center">Available Rooms</h2>
        <div className="row">
          {/* Room Card 1 */}
          <div className="col-md-4">
            <div className="card mb-4">
              <img src="room1.jpg" className="card-img-top" alt="Room 1" />
              <div className="card-body">
                <h5 className="card-title">Standard Room</h5>
                <p className="card-text">$150 per night</p>
                {/* <a href="/book/1" className="btn btn-primary">Book Now</a> */}
              </div>
            </div>
          </div>
          {/* Room Card 2 */}
          <div className="col-md-4">
            <div className="card mb-4">
              <img src="room2.jpg" className="card-img-top" alt="Room 2" />
              <div className="card-body">
                <h5 className="card-title">Deluxe Room</h5>
                <p className="card-text">$180 per night</p>
                {/* <a href="/book/2" className="btn btn-primary">Book Now</a> */}
              </div>
            </div>
          </div>
          {/* Room Card 3 */}
          <div className="col-md-4">
            <div className="card mb-4">
              <img src="room4.jpg" className="card-img-top" alt="Room 3" />
              <div className="card-body">
                <h5 className="card-title">Suite Room</h5>
                <p className="card-text">$250 per night</p>
                {/* <a href="/book/3" className="btn btn-primary">Book Now</a> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features bg-light py-5">
        <div className="container text-center">
          <h2>Features</h2>
          <div className="row">
            <div className="col-md-4">
              <h5>Free Wi-Fi</h5>
              <p>Stay connected with our complimentary Wi-Fi.</p>
            </div>
            <div className="col-md-4">
              <h5>24/7 Room Service</h5>
              <p>Enjoy delicious meals at any time of the day.</p>
            </div>
            <div className="col-md-4">
              <h5>Swimming Pool</h5>
              <p>Relax and unwind in our beautiful pool.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3">
        <p>&copy; 2024 Hotel Booking. All rights reserved. Team-05</p>
      </footer>
    </div>
  );
};

export default Home;
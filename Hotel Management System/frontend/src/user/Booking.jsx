import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const Booking = () => {
  const { rid, uid } = useParams(); // Get both room ID and user ID from URL parameters
  const [details, setDetails] = useState({
    checkInDate: "",
    checkOutDate: "",
    totalNumberOfGuests: "",
  });
  const [message, setMessage] = useState("");
  const [countdown, setCountdown] = useState(5); // Countdown state
  const navigate = useNavigate(); // Initialize useNavigate

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8080/booking/book-room/${uid}/${rid}`, details);
      if (response.status === 200) {
        setMessage(`Your room has been booked successfully! Here is your confirmation code: ${response.data.confirmationCode}`);
        // Start countdown for redirection
        let countdownTimer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(countdownTimer);
              navigate(`/get-user-bookings/${uid}`); // Redirect to user bookings page
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        setMessage("Booking failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Error while booking: " + error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Booking Page</h2>
      <div className="card" style={{ width: '400px', margin: 'auto' }}>
        <div className="card-body">
          <form onSubmit={handleBooking}>
            <div className="mb-3">
              <label htmlFor="checkInDate" className="form-label">Check-In Date:</label>
              <input
                type="date"
                className="form-control"
                id="checkInDate"
                value={details.checkInDate}
                onChange={(e) => setDetails({ ...details, checkInDate: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="checkOutDate" className="form-label">Check-Out Date:</label>
              <input
                type="date"
                className="form-control"
                id="checkOutDate"
                value={details.checkOutDate}
                onChange={(e) => setDetails({ ...details, checkOutDate: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="totalNumberOfGuests" className="form-label">Number of Guests:</label>
              <input
                type="number"
                className="form-control"
                id="totalNumberOfGuests"
                value={details.totalNumberOfGuests}
                onChange={(e) => setDetails({ ...details, totalNumberOfGuests: e.target.value })}
                required
                min="1"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Confirm Booking</button>
          </form>
          {message && (
            <div className="alert alert-info mt-3">
              {message} {countdown > 0 && <span><br></br><br></br>Redirecting to view my bookings page in {countdown} seconds...</span>}
            </div>
          )} {/* Display the message */}
        </div>
      </div>
    </div>
  );
};

export default Booking;
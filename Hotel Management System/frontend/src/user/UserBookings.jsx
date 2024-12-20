import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const UserBookings = () => {
  const location = useLocation();
  const { uid } = useParams(); // Retrieve uid from state
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");
  const [confirmationCode, setConfirmationCode] = useState(""); // State for confirmation code
  const [bookingToCancel, setBookingToCancel] = useState(null); // State to hold the booking to cancel
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); // State for modal visibility
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const [successMessage, setSuccessMessage] = useState(""); // State for success messages

  // Fetch user bookings
  const fetchBookings = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/user/get-user-bookings/${uid}`);
      setBookings(response.data);
      if (response.data.length === 0) {
        setMessage("You don't have any bookings.");
      } else {
        setMessage(""); // Clear message if bookings exist
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setBookings([]);
      setMessage(error.response.data);
    }
  };

  useEffect(() => {
    console.log("User ID:", uid); // Debugging line
    if (uid !== undefined) {
      fetchBookings(uid);
    } else {
      setMessage("User ID is missing.");
    }
  }, [uid]);

  const navigate = useNavigate();

  // Handle cancel booking
  const handleCancelBooking = (bid) => {
    setBookingToCancel(bid); // Set the booking to cancel
    setShowConfirmationModal(true); // Show the confirmation modal
    setErrorMessage(""); // Reset error message
    setSuccessMessage(""); // Reset success message
  };

  const confirmCancelBooking = async () => {
    if (!confirmationCode) {
      setErrorMessage("Please enter the code.");
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:8080/booking/cancel/${bookingToCancel}`, {
        data: { confirmationCode } // Send confirmation code in the request body
      });

      if (response.status === 200) {
        setBookings(bookings.filter(booking => booking.bid !== bookingToCancel)); // Remove the canceled booking from the state
        setSuccessMessage("Your booking is successfully canceled."); // Set success message
        setShowConfirmationModal(false); // Hide the modal
        setConfirmationCode(""); // Clear the confirmation code
      } else {
        setErrorMessage("Please enter a valid code.");
      }
    } catch (error) {
      console.error("Error canceling booking:", error);
      setErrorMessage("Error canceling booking.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Your Bookings</h2>
      {successMessage && <div className="alert alert-success">{successMessage}</div>} {/* Success message */}
      <button className="btn btn-secondary mb-4" onClick={() => navigate('/rooms')}>
        Book Rooms
      </button>

      {bookings.length > 0 ? (
        <div className="row">
          {bookings.map((booking) => (
            <div className="col-md-4 mb-4" key={booking.bid}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Room ID: {booking.room.rid}</h5>
                  <p className="card-text">Check-In: {booking.checkInDate}</p>
                  <p className="card-text">Check-Out: {booking.checkOutDate}</p>
                  <p className="card-text">Guests: {booking.totalNumberOfGuests}</p>
                  <p className="card-text">Confirmation Code: {booking.confirmationCode}</p>
                  <p className="card-text">Room Type: {booking.room.roomType}</p>
                  <p className="card-text">Price: ${booking.room.roomPrice}</p>
                  <p className="card-text">Description: {booking.room.roomDescription}</p>
                  <button className="btn btn-danger" onClick={() => handleCancelBooking(booking.bid)}>Cancel Booking</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-warning" role="alert">
          {message}
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Cancellation</h5>
                <button type="button" className="close" onClick={() => setShowConfirmationModal(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Enter your confirmation code to cancel the booking:</p>
                <input
                  type="text"
                  className="form-control"
                  value={confirmationCode}
                  onChange={(e) => setConfirmationCode(e.target.value)}
                  required
                />
                {errorMessage && <div className="alert alert-danger mt-2">{errorMessage}</div>}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowConfirmationModal(false)}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={confirmCancelBooking}>Confirm Cancellation</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserBookings;
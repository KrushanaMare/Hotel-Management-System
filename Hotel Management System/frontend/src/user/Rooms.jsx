import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Rooms.css'; // Import the CSS file

const AvailableRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [roomCategories, setRoomCategories] = useState([]);
  const [filters, setFilters] = useState({
    type: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  });

  const location = useLocation();
  const { uid } = location.state || {};
  const navigate = useNavigate();

  // Fetch available rooms
  const fetchRooms = async () => {
    try {
      const response = await axios.get("http://localhost:8080/room/all-available-rooms");
      setRooms(response.data);
      setFilteredRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
      setRooms([]);
    }
  };

  // Fetch room types and categories
  const fetchRoomTypesAndCategories = async () => {
    try {
      const typesResponse = await axios.get("http://localhost:8080/room/types");
      const categoriesResponse = await axios.get("http://localhost:8080/room/categories");
      setRoomTypes(typesResponse.data);
      setRoomCategories(categoriesResponse.data);
    } catch (error) {
      console.error("Error fetching room types or categories:", error);
    }
  };

  useEffect(() => {
    fetchRooms();
    fetchRoomTypesAndCategories();
  }, []);

  // Filter rooms based on selected filters
  const applyFilters = () => {
    let filtered = rooms;

    if (filters.type) {
      filtered = filtered.filter(room => room.roomType === filters.type);
    }

    if (filters.category) {
      filtered = filtered.filter(room => room.roomCategory === filters.category);
    }

    if (filters.minPrice) {
      filtered = filtered.filter(room => room.roomPrice >= filters.minPrice);
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(room => room.roomPrice <= filters.maxPrice);
    }

    setFilteredRooms(filtered);
  };

  // Handle booking button click
  const handleBookClick = (rid) => {
    navigate(`/booking/${rid}/${uid}`);
  };

  // Navigate to UserBookings page
  const handleViewBookings = () => {
    navigate(`/get-user-bookings/${uid}`);
  };

  // Navigate to Change Password page
  const handleChangePassword = () => {
    navigate(`/change-password/${uid}`);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Available Rooms</h2>
      <div className="mb-4">
        <button className="btn btn-secondary me-2" onClick={handleViewBookings}>
          View My Bookings
        </button>
        <button className="btn btn-warning" onClick={handleChangePassword}>
          Change Password
        </button>
      </div>

      {/* Filter Section */}
      <div className="mb-4">
        <h5>Filters</h5>
        <div className="row">
          <div className="col-md-3">
            <select className="form-select" onChange={(e) => setFilters({ ...filters, type: e.target.value })}>
              <option value="">Select Room Type</option>
              {roomTypes.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <select className="form-select" onChange={(e) => setFilters({ ...filters, category: e.target.value })}>
              <option value="">Select Room Category</option>
              {roomCategories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <input
              type="number"
              className="form-control"
              placeholder="Min Price"
              onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
            />
          </div>
          <div className="col-md-3">
            <input
              type="number"
              className="form-control"
              placeholder="Max Price"
              onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
            />
          </div>
        </div>
        <button className="btn btn-primary mt-3" onClick={applyFilters}>Apply Filters</button>
      </div>

      {/* Container for room cards */}
      <div className="row">
        {filteredRooms.length > 0 ? (
          filteredRooms.map((room) => (
            <div className="col-md-4 mb-4" key={room.rid}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{room.roomType}</h5>
                  <p className="card-text">Category: {room.roomCategory}</p>
                  <p className="card-text">Price: ₹{room.roomPrice}</p>
                  <p className="card-text">{room.roomDescription}</p>
                  <button className="btn btn-success" onClick={() => handleBookClick(room.rid)}>Book</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <p>No rooms available matching your criteria. Please try adjusting the filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableRooms;
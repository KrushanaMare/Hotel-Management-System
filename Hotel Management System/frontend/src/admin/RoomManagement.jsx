import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState({ rid: "", roomType: "", roomCategory: "", roomPrice: "", roomDescription: "" });
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const fetchRooms = async () => {
    try {
      const response = await axios.get("http://localhost:8080/admin/show-all-rooms");
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
      setMessage("Error fetching rooms.");
    }
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:8080/admin/update-room/${room.rid}`, room);
        setMessage("Room updated successfully!");
      } else {
        await axios.post("http://localhost:8080/admin/add-room", room);
        setMessage("Room added successfully!");
      }
      fetchRooms(); // Refresh the room list
      resetForm();
    } catch (error) {
      console.error("Error saving room:", error);
      setMessage("Error saving room.");
    }
  };

  const handleDeleteRoom = async (rid) => {
    try {
      await axios.delete(`http://localhost:8080/admin/delete-room/${rid}`);
      setMessage("Room deleted successfully!");
      fetchRooms(); // Refresh the room list
    } catch (error) {
      console.error("Error deleting room:", error);
      setMessage("Error deleting room.");
    }
  };

  const handleEditRoom = (room) => {
    setRoom(room);
    setIsEditing(true);
  };

  const resetForm = () => {
    setRoom({ rid: "", roomType: "", roomCategory: "", roomPrice: "", roomDescription: "" });
    setIsEditing(false);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Room Management</h2>
      <form onSubmit={handleAddRoom} className="mb-4">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Room Type"
            value={room.roomType}
            onChange={(e) => setRoom({ ...room, roomType: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Room Category"
            value={room.roomCategory}
            onChange={(e) => setRoom({ ...room, roomCategory: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Room Price"
            value={room.roomPrice}
            onChange={(e) => setRoom({ ...room, roomPrice: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            placeholder="Room Description"
            value={room.roomDescription}
            onChange={(e) => setRoom({ ...room, roomDescription: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">{isEditing ? "Update Room" : "Add Room"}</button>
        {isEditing && <button type="button" className="btn btn-secondary ms-2" onClick={resetForm}>Cancel</button>}
      </form>
      {message && <div className="alert alert-info">{message}</div>}
      <h4>All Rooms</h4>
      <div className="row">
        {rooms.map((room) => (
          <div key={room.rid} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{room.roomType}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{room.roomCategory}</h6>
                <p className="card-text">{room.roomDescription}</p>
                <p className="card-text"><strong>Price: </strong>${room.roomPrice}</p>
                <button className="btn btn-danger" onClick={() => handleDeleteRoom(room.rid)}>Delete</button>
                <button className="btn btn-warning ms-2" onClick={() => handleEditRoom(room)}>Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomManagement;
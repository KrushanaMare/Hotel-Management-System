import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookingManagement = () => {
    const [bookings, setBookings] = useState([]);
    const [newBooking, setNewBooking] = useState({
        checkInDate: '',
        checkOutDate: '',
        totalNumberOfGuests: '',
        confirmationCode: '',
        uid: '', // Assuming you have user ID
        rid: ''  // Assuming you have room ID
    });
    const [editingBooking, setEditingBooking] = useState(null);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        const response = await axios.get('http://localhost:8080/admin/show-all-bookings');
        setBookings(response.data);
    };

    const handleAddBooking = async () => {
        const response = await axios.post(`http://localhost:8080/admin/add-booking/${newBooking.uid}/${newBooking.rid}`, newBooking);
        setBookings([...bookings, response.data]);
        setNewBooking({ checkInDate: '', checkOutDate: '', totalNumberOfGuests: '', confirmationCode: '', uid: '', rid: '' });
    };

    const handleUpdateBooking = async () => {
        const response = await axios.put(`http://localhost:8080/admin/update-booking/${editingBooking.bid}`, editingBooking);
        setBookings(bookings.map(b => (b.bid === editingBooking.bid ? response.data : b)));
        setEditingBooking(null);
    };

    const handleDeleteBooking = async (bid) => {
        await axios.delete(`http://localhost:8080/admin/delete-booking/${bid}`);
        setBookings(bookings.filter(b => b.bid !== bid));
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Booking Management</h1>
            <h2>Add New Booking</h2>
            <div className="form-group">
                <input type="date" className="form-control" value={newBooking.checkInDate} onChange={(e) => setNewBooking({ ...newBooking, checkInDate: e.target.value })} />
                <input type="date" className="form-control mt-2" value={newBooking.checkOutDate} onChange={(e) => setNewBooking({ ...newBooking, checkOutDate: e.target.value })} />
                <input type="number" className="form-control mt-2" value={newBooking.totalNumberOfGuests} onChange={(e) => setNewBooking({ ...newBooking, totalNumberOfGuests: e.target.value })} placeholder="Total Guests" />
                <input type="text" className="form-control mt-2" value={newBooking.uid} onChange={(e) => setNewBooking({ ...newBooking, uid: e.target.value })} placeholder="Room ID" />
                <input type="text" className="form-control mt-2" value={newBooking.rid} onChange={(e) => setNewBooking({ ...newBooking, rid: e.target.value })} placeholder="User ID" />
                <button className="btn btn-primary mt-3" onClick={handleAddBooking}>Add Booking</button>
            </div>

            <h2 className="mt-5">All Bookings</h2>
            <ul className="list-group">
                {bookings.map(booking => (
                    <li key={booking.bid} className="list-group-item d-flex justify-content-between align-items-center">
                        {booking.checkInDate} - {booking.checkOutDate} | Guests: {booking.totalNumberOfGuests} | Code: {booking.confirmationCode}
                        <div>
                            <button className="btn btn-warning btn-sm" onClick={() => setEditingBooking(booking)}>Edit</button>
                            <button className="btn btn-danger btn-sm mx-2" onClick={() => handleDeleteBooking(booking.bid)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>

            {editingBooking && (
                <div className="mt-4">
                    <h2>Edit Booking</h2>
                    <div className="form-group">
                        <input type="date" className="form-control" value={editingBooking.checkInDate} onChange={(e) => setEditingBooking({ ...editingBooking, checkInDate: e.target.value })} />
                        <input type="date" className="form-control mt-2" value={editingBooking.checkOutDate} onChange={(e) => setEditingBooking({ ...editingBooking, checkOutDate: e.target.value })} />
                        <input type="number" className="form-control mt-2" value={editingBooking.totalNumberOfGuests} onChange={(e) => setEditingBooking({ ...editingBooking, totalNumberOfGuests: e.target.value })} placeholder="Total Guests" />
                        <input type="text" className="form-control mt-2" value={editingBooking.confirmationCode} onChange={(e) => setEditingBooking({ ...editingBooking, confirmationCode: e.target.value })} placeholder="Confirmation Code" />
                        <button className="btn btn-success mt-3" onClick={handleUpdateBooking}>Update Booking</button>
                        <button className="btn btn-secondary mt-3 mx-2" onClick={() => setEditingBooking(null)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingManagement;
import React, { useState } from 'react';
import axios from 'axios';

const AddRoom = () => {
    const [roomType, setRoomType] = useState('');
    const [roomPrice, setRoomPrice] = useState('');
    const [roomCategory, setRoomCategory] = useState('');
    const [roomDescription, setRoomDescription] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const roomData = {
            roomType,
            roomPrice: parseDouble(roomPrice),
            roomCategory,
            roomDescription,
        };

        try {
            const response = await axios.post('http://localhost:8080/', roomData);
            if (response.status === 201) {
                setMessage('Room added successfully!');
                // Clear the form
                setRoomType('');
                setRoomPrice('');
                setRoomCategory('');
                setRoomDescription('');
            }
        } catch (error) {
            setMessage('Error adding room. Please try again.');
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Add Room</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Room Type:</label>
                    <input
                        type="text"
                        value={roomType}
                        onChange={(e) => setRoomType(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Room Price:</label>
                    <input
                        type="number"
                        value={roomPrice}
                        onChange={(e) => setRoomPrice(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Room Category:</label>
                    <input
                        type="text"
                        value={roomCategory}
                        onChange={(e) => setRoomCategory(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Room Description:</label>
                    <textarea
                        value={roomDescription}
                        onChange={(e) => setRoomDescription(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Room</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddRoom;
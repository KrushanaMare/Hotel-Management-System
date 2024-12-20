import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Home from './Home.jsx';
import Register from './user/Register.jsx';
import Login from './user/Login.jsx';
import AvailableRooms from './user/Rooms.jsx';
import AddRoom from './admin/AddRoom.jsx';
import Booking from './user/Booking.jsx';
import UserBookings from './user/UserBookings.jsx';
import UserManagement from './admin/UserManagement.jsx';
import RoomManagement from './admin/RoomManagement.jsx';
import BookingManagement from './admin/BookingManagement.jsx';

import Navbar from './admin/AdminNav.jsx';
import ChangePassword from './user/ChangePassword.jsx';
// import Navbar from './Navbar.jsx';
 
const myRouter = createBrowserRouter([
  {
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/rooms",
        element: <AvailableRooms />
      },
      {
        path: "/addroom",
        element: <AddRoom />
      },
      {
        path: "booking/:rid/:uid",
        element: <Booking />
      },
      {
        path: "get-user-bookings/:uid",
        element: <UserBookings />
      },
      {
        path: "user-management",
        element: <UserManagement />
      },
      {
        path: "room-management",
        element: <RoomManagement />
      },
      {
        path: "booking-management",
        element: <BookingManagement />
      },
      {
        path: "admin-nav",
        element: <Navbar />
      },
      {
        path: "change-password/:uid",
        element: <ChangePassword />
      }
    ]
  }
]);
 
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={myRouter} />
  </StrictMode>
);
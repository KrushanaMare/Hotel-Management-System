package com.dev.controller;

import java.nio.file.AccessDeniedException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dev.model.User;
import com.dev.model.Room;
import com.dev.model.Booking;
import com.dev.service.UserService;
import com.dev.service.RoomService;
import com.dev.service.BookingService;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins="http://localhost:5173/")
public class AdminController {
	
	@Autowired
	private UserService userService;
	
	
	@Autowired
	private BookingService bookingService;
	
	@Autowired
	private RoomService roomService;
	
	
	
	@PostMapping("/add-user")
	public ResponseEntity<Object> AddUser(@RequestBody User user){
		if(user.getRole()==null||user.getRole().isEmpty()) {
			user.setRole("USER");
		}
		userService.AddUSer(user);
		return new ResponseEntity<>(user,HttpStatus.OK);
	}
	
	@GetMapping("/show-all-users")
	public ResponseEntity<List<User>> showAllUsers(){
		List<User> users= userService.showAll();
		return new ResponseEntity<>(users,HttpStatus.OK);
	}
	
	@DeleteMapping("/delete-user/{uid}")
	public ResponseEntity<Object> DeleteUser(@PathVariable("uid")Integer uid) throws AccessDeniedException{
		User user = userService.deleteUser(uid);
		return new ResponseEntity<>(user,HttpStatus.OK);
	}
	
	@PutMapping("/update-user/{uid}")
	public ResponseEntity<User>UpdateUser(@PathVariable("uid")Integer uid, @RequestBody User user) throws AccessDeniedException{
		user.setUid(uid);
		user=userService.updateUser(user);
		return new ResponseEntity<>(user,HttpStatus.OK);
	}
	
	@PostMapping("/add-room")
	public ResponseEntity<Room> getAdd(@RequestBody Room room){
		Room savedRoom=roomService.addRoom(room);
		return new ResponseEntity<>(savedRoom,HttpStatus.OK);
	}
	
	@GetMapping("/show-all-rooms")
	public ResponseEntity<List<Room>> showAllRooms(){
		List<Room> rooms = roomService.showAllRooms();
		return new ResponseEntity<>(rooms,HttpStatus.OK);
	}
	
	@DeleteMapping("/delete-room/{rid}")
	public ResponseEntity<Room> deleteRoom(@PathVariable("rid") Integer rid){
		Room room = roomService.deleteRoom(rid);
		return new ResponseEntity<>(room,HttpStatus.OK);
	}
	
	@PutMapping("/update-room/{rid}")
	public ResponseEntity<Room> updateRoom(@PathVariable("rid")Integer rid, @RequestBody Room room){
		room.setRid(rid);
		room=roomService.updateRoom(room);
		return new ResponseEntity<>(room,HttpStatus.OK);
	}
	
	@PostMapping("/add-booking/{uid}/{rid}")
	public ResponseEntity<Booking> addBooking(@PathVariable Integer rid, @PathVariable Integer uid,@RequestBody Booking booking){
		Booking savedBooking=bookingService.addBooking(rid,uid,booking);
		return new ResponseEntity<>(savedBooking,HttpStatus.OK);
	}
	
	@GetMapping("/show-all-bookings")
	public ResponseEntity<List<Booking>> showAllBookings(){
		List<Booking> bookings = bookingService.showAll();
		return new ResponseEntity<>(bookings,HttpStatus.OK);
	}
	
	@DeleteMapping("/delete-booking/{bid}")
	public ResponseEntity<Booking> DeleteBooking(@PathVariable("bid")Integer bid){
		Booking booking = bookingService.deleteBooking(bid);
		return new ResponseEntity<Booking>(booking,HttpStatus.OK);
	}
	
	@PutMapping("update-booking/{bid}")
	public ResponseEntity<Booking> UpdateBooking(@PathVariable("bid")Integer bid, @RequestBody Booking booking){
		booking.setBid(bid);
		booking=bookingService.updateBooking(booking);
		return new ResponseEntity<>(booking,HttpStatus.OK);
	}
	
	
}

package com.dev.controller;

import java.nio.file.AccessDeniedException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dev.model.Booking;
import com.dev.model.User;
import com.dev.service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins="http://localhost:5173/")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/register")
	public ResponseEntity<User> register(@RequestBody User user){
		userService.AddUSer(user);
		return new ResponseEntity<>(user,HttpStatus.OK);
	}
	
	@PostMapping("/login")
	public ResponseEntity<User> login(@RequestBody User user){
		User authenticatedUser =userService.login(user.getEmail(),user.getPassword());
		return new ResponseEntity<>(authenticatedUser,HttpStatus.OK);
	}
	
	@PutMapping("/change-password/{uid}")
	public ResponseEntity<User> changePassword(@PathVariable("uid") Integer uid, @RequestBody User user) throws AccessDeniedException {
			user.setUid(uid);
	        User updatedUser = userService.changePassword(uid,user);
	        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
	}
	
	@GetMapping("/get-user-bookings/{uid}")
	public ResponseEntity<List<Booking>> getUserBookings(@PathVariable("uid")Integer uid){
		List<Booking> bookings = userService.getUserBookings(uid);
		return new ResponseEntity<>(bookings,HttpStatus.OK);
		
	}


}

package com.dev.controller;

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

import com.dev.model.Booking;
import com.dev.service.BookingService;


@RestController
@RequestMapping("/booking")
@CrossOrigin(origins="http://localhost:5173/")
public class BookingController {
	
	@Autowired
	private BookingService bookingService;
	
	@PostMapping("/book-room/{uid}/{rid}")
	public ResponseEntity<Booking> addBooking(@PathVariable("uid")Integer uid, @PathVariable("rid")Integer rid, @RequestBody Booking booking){
		Booking savedBooking = bookingService.addBooking(uid, rid, booking);
		return new ResponseEntity<>(savedBooking,HttpStatus.OK);
	}
	
	@DeleteMapping("/cancel/{bid}")
    public ResponseEntity<Booking> cancelBooking(@PathVariable("bid") Integer bid,@RequestBody Booking booking) {
		Booking cancelledBooking = bookingService.cancelBooking(bid,booking);
		return new ResponseEntity<>(cancelledBooking,HttpStatus.OK);
    }
}

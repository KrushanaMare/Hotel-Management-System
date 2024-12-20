package com.dev.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.dev.model.Room;
import com.dev.service.RoomService;

@RestController
@RequestMapping("/room")
@CrossOrigin(origins="http://localhost:5173/")
public class RoomController {
	
	@Autowired
	private RoomService roomService;
	
	@GetMapping("/types")
	public List<String> getAllRoomTypes(){
		return roomService.getAllRoomTypes();
	}
	
	@GetMapping("/categories")
	public List<String> getAllRoomCategories(){
		return roomService.getAllRoomCategories();
	}
	
	@GetMapping("/all-available-rooms")
	public ResponseEntity<List<Room>> getAllAvailableRooms(){
		List<Room> rooms = roomService.getAllAvailableRooms();
		return new ResponseEntity<>(rooms,HttpStatus.OK);
	}
	
	@GetMapping("/available-rooms-by-type/{roomType}")
	public ResponseEntity<List<Room>> getAvailableRoomsByType(@PathVariable("roomType")String roomType){
		List<Room> rooms = roomService.getAvailableRoomsByType(roomType);
		if(rooms.size()>0) {
			return new ResponseEntity<>(rooms,HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	@GetMapping("/available-rooms-by-category/{roomCategory}")
	public ResponseEntity<List<Room>> getAvailableRoomsByCategory(@PathVariable("roomCategory")String roomCategory){
		List<Room> rooms = roomService.getAvailableRoomsByCategory(roomCategory);
		if(rooms.size()>0) {
			return new ResponseEntity<>(rooms,HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	@GetMapping("/available-rooms-by-minprice/{roomPrice}")
	public ResponseEntity<List<Room>> getAvailableRoomsByMinPrice(@PathVariable("roomPrice")Double roomPrice){
		List<Room> rooms = roomService.getAvailableRoomsByMinPrice(roomPrice);
		if(rooms.size()>0) {
			return new ResponseEntity<>(rooms,HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	@GetMapping("/available-rooms-by-price")
	public ResponseEntity<List<Room>> getAvailableRoomsByPrice(){
		List<Room> rooms = roomService.getAvailableRoomsByPrice();
		if(rooms.size()>0) {
			return new ResponseEntity<>(rooms,HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	
}

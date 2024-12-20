package com.dev.service;

import java.util.List;

import com.dev.model.Room;

public interface RoomService {
	
	public Room addRoom(Room room);
	
	public List<Room> showAllRooms();
	
	public Room findById(int rid);

	public Room deleteRoom(int rid);

	public Room updateRoom(Room room);

	public List<String> getAllRoomTypes();

	public List<String> getAllRoomCategories();

	public List<Room> getAllAvailableRooms();

	public List<Room> getAvailableRoomsByPrice();

	public List<Room> getAvailableRoomsByMinPrice(Double roomPrice);

	public List<Room> getAvailableRoomsByType(String roomType);

	public List<Room> getAvailableRoomsByCategory(String roomCategory);
}

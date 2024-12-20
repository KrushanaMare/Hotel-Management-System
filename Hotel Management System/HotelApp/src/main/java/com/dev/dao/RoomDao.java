package com.dev.dao;

import java.util.List;

import com.dev.model.Room;

public interface RoomDao {
	
	public Room addRoom(Room room);
	
	public List<Room> showAll();
	
	public Room deleteRoom(int rid);
	
	public Room updateRoom(Room room);

	public Room findById(int rid);

	public List<String> getAllRoomTypes();

	public List<String> getAllRoomCategories();

	public List<Room> getAllAvailableRooms();

	public List<Room> getAvailableRoomsByPrice();

	public List<Room> getAvailableRoomsByMinPrice(Double roomPrice);

	public List<Room> getAvailableRoomsByType(String roomType);

	public List<Room> getAvailableRoomsByCategory(String roomCategory);
}

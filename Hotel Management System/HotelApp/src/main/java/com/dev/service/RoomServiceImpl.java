package com.dev.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dev.dao.RoomDao;
import com.dev.model.Room;

@Service
public class RoomServiceImpl implements RoomService{
	
	@Autowired
	private RoomDao roomDao;

	@Override
	public Room addRoom(Room room) {
		return roomDao.addRoom(room);
	}

	@Override
	public List<Room> showAllRooms() {
		return roomDao.showAll();
	}

	@Override
	public Room deleteRoom(int rid) {
		return roomDao.deleteRoom(rid);
	}

	@Override
	public Room updateRoom(Room room) {
		return roomDao.updateRoom(room);
	}

	@Override
	public Room findById(int rid) {
		return roomDao.findById(rid);
	}

	@Override
	public List<String> getAllRoomTypes() {
		return roomDao.getAllRoomTypes();
	}

	@Override
	public List<String> getAllRoomCategories() {
		return roomDao.getAllRoomCategories();
	}

	@Override
	public List<Room> getAllAvailableRooms() {
		return roomDao.getAllAvailableRooms();
	}

	@Override
	public List<Room> getAvailableRoomsByPrice() {
		return roomDao.getAvailableRoomsByPrice();
	}

	@Override
	public List<Room> getAvailableRoomsByMinPrice(Double roomPrice) {
		return roomDao.getAvailableRoomsByMinPrice(roomPrice);
	}

	@Override
	public List<Room> getAvailableRoomsByType(String roomType) {
		return roomDao.getAvailableRoomsByType(roomType);
	}

	@Override
	public List<Room> getAvailableRoomsByCategory(String roomCategory) {
		return roomDao.getAvailableRoomsByCategory(roomCategory);
	}
	
	

}

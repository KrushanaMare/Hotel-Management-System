package com.dev.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.dev.exception.NotFoundException;
import com.dev.jpa.RoomJPARepository;
import com.dev.model.Room;

@Repository
public class RoomDaoImpl implements RoomDao{
	
	@Autowired
	private RoomJPARepository roomRepo;
	
	@Override
	public Room addRoom(Room room) {
		return roomRepo.save(room);
	}

	@Override
	public List<Room> showAll() {
		List<Room> rooms = (List<Room>) roomRepo.findAll();
		if(rooms.size()==0) {
			throw new NotFoundException("No Rooms Found!");
		}
		return rooms;
	}

	public Room deleteRoom(int rid) {
		Optional<Room> getRoom = roomRepo.findById(rid);
		if(!getRoom.isPresent()) {
			throw new NotFoundException("Room Not Found! Cannot Delete!");
		}
		Room room = getRoom.get();
		if(room!=null) {
			roomRepo.deleteById(rid);
		}
		return room;
	}
	
	@Override
	public Room updateRoom(Room room) {
		Optional<Room> getRoom = roomRepo.findById(room.getRid());
		if(!getRoom.isPresent()) {
			throw new NotFoundException("Room Not Found! Cannot Update!");
		}
		Room existingRoom = getRoom.get();
		String newRoomType=room.getRoomType();
		existingRoom.setRoomType(newRoomType);
		Double newRoomPrice=room.getRoomPrice();
		existingRoom.setRoomPrice(newRoomPrice);
		String newRoomCategory=room.getRoomCategory();
		existingRoom.setRoomCategory(newRoomCategory);
		String newRoomDescription=room.getRoomDescription();
		existingRoom.setRoomDescription(newRoomDescription);
		Room updatedRoom=roomRepo.save(existingRoom);
		return updatedRoom;
	}

	@Override
	public Room findById(int rid) {
		Optional<Room> getRoom = roomRepo.findById(rid);
		return getRoom.get();
	}

	@Override
	public List<String> getAllRoomTypes() {
		return roomRepo.findDistinctRoomTypes();
	}

	@Override
	public List<String> getAllRoomCategories() {
		return roomRepo.findDistinctRoomCategories();
	}

	@Override
	public List<Room> getAllAvailableRooms() {
		return roomRepo.findAllAvailableRooms();
	}

	@Override
	public List<Room> getAvailableRoomsByPrice() {
		return roomRepo.findAvailableRoomsByPrice();
	}

	@Override
	public List<Room> getAvailableRoomsByMinPrice(Double roomPrice) {
		return roomRepo.findAvailableRoomsByMinPrice(roomPrice);
	}

	@Override
	public List<Room> getAvailableRoomsByType(String roomType) {
		return roomRepo.findAvailableRoomsByType(roomType);
	}

	@Override
	public List<Room> getAvailableRoomsByCategory(String roomCategory) {
		return roomRepo.findAvailableRoomsByCategory(roomCategory);
	}
	
	
}

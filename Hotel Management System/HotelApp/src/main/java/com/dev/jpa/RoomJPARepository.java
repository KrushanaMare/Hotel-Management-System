package com.dev.jpa;

import java.util.List;

import org.antlr.v4.runtime.atn.SemanticContext.AND;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.dev.model.Room;

@Repository
public interface RoomJPARepository extends CrudRepository<Room, Integer>{
	
	
	@Query("select distinct r.roomType from Room r")
	public List<String> findDistinctRoomTypes();
	
	@Query("select distinct r.roomCategory from Room r")
	public List<String> findDistinctRoomCategories();
	
	@Query("select r from Room r where r.rid not in(select b.room.rid from Booking b)")
	public List<Room> findAllAvailableRooms();
	
	@Query("select r from Room r where r.rid not in(select b.room.rid from Booking b) order by r.roomPrice asc")
	public List<Room> findAvailableRoomsByPrice();
	
	@Query("select r from Room r where r.rid not in(select b.room.rid from Booking b) and r.roomPrice<=:roomPrice")
	public List<Room> findAvailableRoomsByMinPrice(Double roomPrice);
	
	@Query("select r from Room r where r.rid not in(select b.room.rid from Booking b) and r.roomType=:roomType")
	public List<Room> findAvailableRoomsByType(String roomType);

	@Query("select r from Room r where r.rid not in(select b.room.rid from Booking b) and r.roomCategory=:roomCategory")
	public List<Room> findAvailableRoomsByCategory(String roomCategory);

	
	
}

package com.dev.dao;

import java.util.List;

import com.dev.model.Booking;

public interface BookingDao {

	public Booking addBooking(Integer uid, Integer rid, Booking booking);

	public List<Booking> showAll();

	public Booking updateBooking(Booking booking);

	public Booking deleteBooking(int bid);

	public Booking cancelBooking(Integer bid, Booking booking);

	

}

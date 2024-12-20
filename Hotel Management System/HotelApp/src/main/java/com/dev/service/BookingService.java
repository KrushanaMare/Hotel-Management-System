package com.dev.service;

import java.util.List;

import com.dev.model.Booking;

public interface BookingService {

	public Booking addBooking(Integer uid, Integer rid, Booking booking);

	public List<Booking> showAll();

	public Booking deleteBooking(Integer bid);

	public Booking updateBooking(Booking booking);

	public Booking cancelBooking(Integer bid, Booking booking);

}

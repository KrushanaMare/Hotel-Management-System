package com.dev.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dev.dao.BookingDao;
import com.dev.model.Booking;

@Service
public class BookingServiceImpl implements BookingService {
	
	@Autowired
	private BookingDao bookingDao;

	@Override
	public Booking addBooking(Integer uid,Integer rid, Booking booking) {
		return bookingDao.addBooking(uid, rid, booking);
	}

	@Override
	public List<Booking> showAll() {
		return bookingDao.showAll();
	}

	@Override
	public Booking deleteBooking(Integer bid) {
		return bookingDao.deleteBooking(bid);
	}

	@Override
	public Booking updateBooking(Booking booking) {
		return bookingDao.updateBooking(booking);
	}

	@Override
	public Booking cancelBooking(Integer bid, Booking booking) {
		return bookingDao.cancelBooking(bid,booking);
	}

}

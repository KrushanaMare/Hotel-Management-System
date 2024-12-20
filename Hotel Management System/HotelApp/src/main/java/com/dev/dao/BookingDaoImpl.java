package com.dev.dao;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

import com.dev.exception.NotFoundException;
import com.dev.jpa.BookingJPARepository;
import com.dev.jpa.RoomJPARepository;
import com.dev.jpa.UserJPARepository;
import com.dev.model.Booking;
import com.dev.model.Room;
import com.dev.model.User;

@Repository
public class BookingDaoImpl implements BookingDao {
    
    @Autowired
    private BookingJPARepository bookingRepo;
    
    @Autowired
    private UserJPARepository userRepo;
    
    @Autowired
    private RoomJPARepository roomRepo;
    
 
    
    @Override
    public Booking addBooking(Integer uid, Integer rid, Booking booking) {
    	if(booking.getCheckOutDate().isBefore(booking.getCheckInDate())) {
    		throw new IllegalArgumentException("Check in date must come before checkout date!");
    	}
        Room room = roomRepo.findById(rid).orElseThrow(() -> new NotFoundException("Room not found!"));
        User user = userRepo.findById(uid).orElseThrow(() -> new NotFoundException("User not found!"));
        List<Booking> existingBookings = room.getBookings();
        if (!roomIsAvailable(booking, existingBookings)) {
            throw new NotFoundException("Room not available for selected date range!");
        }
        
        booking.setRoom(room);
        booking.setUser(user);
        String confirmationCode = UUID.randomUUID().toString();
        booking.setConfirmationCode(confirmationCode);
        return bookingRepo.save(booking);
    }

    @Override
    public List<Booking> showAll() {
    	List<Booking> bookings = (List<Booking>) bookingRepo.findAll();
    	if(bookings.size()==0) {
    		throw new NotFoundException("No Bookings Found!");
    	}
		return bookings;
    }

    @Override
    public Booking deleteBooking(int bid) {
    	Optional<Booking> getBooking = bookingRepo.findById(bid);
    	if(!getBooking.isPresent()) {
    		throw new NotFoundException("No Booking Found! Cannot Delete!");
    	}
		Booking booking = getBooking.get();
		if(booking!=null) {
			bookingRepo.deleteById(bid);
		}
		return booking;
    }

    @Override
    public Booking updateBooking(Booking booking) {
        Optional<Booking> getBooking = bookingRepo.findById(booking.getBid());
        if (!getBooking.isPresent()) {
        	throw new NotFoundException("No Booking Found! Cannot Update!");
        }
        Booking existingBooking = getBooking.get();
        existingBooking.setCheckInDate(booking.getCheckInDate());
        existingBooking.setCheckOutDate(booking.getCheckOutDate());
        existingBooking.setTotalNumberOfGuests(booking.getTotalNumberOfGuests());
        existingBooking.setConfirmationCode(booking.getConfirmationCode());
        return bookingRepo.save(existingBooking);
    }
    
    private boolean roomIsAvailable(Booking booking, List<Booking> existingBookings) {
        LocalDate newCheckIn = booking.getCheckInDate();
        LocalDate newCheckOut = booking.getCheckOutDate();

        return existingBookings.stream()
                .noneMatch(existingBooking -> {
                    LocalDate existingCheckIn = existingBooking.getCheckInDate();
                    LocalDate existingCheckOut = existingBooking.getCheckOutDate();
                    return (newCheckIn.isBefore(existingCheckOut) && newCheckOut.isAfter(existingCheckIn));
                });
    }
	@Override
	public Booking cancelBooking(Integer bid, Booking booking) {
		Optional<Booking> getBooking = bookingRepo.findById(bid);
		if(!getBooking.isPresent()) {
			throw new NotFoundException("No Booking Found!");
		}
		Booking existingBooking=getBooking.get();
		String oldConfirmationCode=existingBooking.getConfirmationCode();
		String newConfirmationCode=booking.getConfirmationCode();
		if(!oldConfirmationCode.equals(newConfirmationCode)) {
			throw new IllegalArgumentException("Invalid confirmation code!");
		}
		bookingRepo.deleteById(bid);
		return existingBooking;
		
		
	}
}
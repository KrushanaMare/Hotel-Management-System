package com.dev.jpa;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.dev.model.Booking;

@Repository
public interface BookingJPARepository extends CrudRepository<Booking,Integer> {
	
	public Booking findByConfirmationCode(String confirmationCode);
}

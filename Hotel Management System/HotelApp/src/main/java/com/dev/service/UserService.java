package com.dev.service;

import java.nio.file.AccessDeniedException;
import java.util.List;

import com.dev.model.Booking;
import com.dev.model.User;

public interface UserService {
	
	public void AddUSer(User user);
	
	public List<User> showAll();
	
	public User findById(int uid);

	public User deleteUser(int uid) throws AccessDeniedException;

	public User updateUser(User user) throws AccessDeniedException;

	public User login(String email, String password);

	public User changePassword(Integer uid, User user) throws AccessDeniedException;

	public List<Booking> getUserBookings(Integer uid);

	

	
	
}

package com.dev.dao;

import java.nio.file.AccessDeniedException;
import java.util.List;

import com.dev.model.Booking;
import com.dev.model.User;

public interface UserDao {

	public void AddUser(User user);
	
	public List<User> showAll();

	public User updateUser(User user) throws AccessDeniedException;

	public User deleteUser(int uid) throws AccessDeniedException;

	public User findById(int uid);

	public User login(String email, String password);

	public User changePassword(Integer uid, User user);

	public List<Booking> getUserBookings(Integer uid);
}

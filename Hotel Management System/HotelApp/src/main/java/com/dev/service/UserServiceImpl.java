package com.dev.service;

import java.nio.file.AccessDeniedException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dev.dao.UserDao;
import com.dev.model.Booking;
import com.dev.model.User;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserDao userDao;
	
	@Override
	public void AddUSer(User user) {
		userDao.AddUser(user);
		
	}

	@Override
	public List<User> showAll() {
		return userDao.showAll();
	}

	@Override
	public User deleteUser(int uid) throws AccessDeniedException {
		return userDao.deleteUser(uid);
	}

	@Override
	public User updateUser(User user) throws AccessDeniedException {
		return userDao.updateUser(user);
	}

	@Override
	public User findById(int uid) {
		return userDao.findById(uid);
	}

	@Override
	public User login(String email,String password) {
		return userDao.login(email,password);
	}

	@Override
	public User changePassword(Integer uid,User user) {
		return userDao.changePassword(uid,user);
	}

	@Override
	public List<Booking> getUserBookings(Integer uid) {
		return userDao.getUserBookings(uid);
	}
	

}

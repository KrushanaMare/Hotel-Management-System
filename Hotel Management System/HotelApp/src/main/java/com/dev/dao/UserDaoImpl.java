package com.dev.dao;


import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

import com.dev.exception.NotFoundException;
import com.dev.jpa.UserJPARepository;
import com.dev.model.Booking;
import com.dev.model.User;

@Repository
public class UserDaoImpl implements UserDao{
	
	@Autowired
	private UserJPARepository repo;
	
	 @Autowired
	 private PasswordEncoder passwordEncoder;

	@Override
	public void AddUser(User user) {
		if(user==null) {
			throw new IllegalArgumentException("User must not be null!");
		}
		if(user.getRole()==null) {
			List<User> admins  = repo.findByRole("ADMIN");
			if(admins.size()==0) {
				user.setRole("ADMIN");
			}
			else{
				user.setRole("USER");
			}
		}
		
		
		
		if(user.getUname()==null) {
			throw new IllegalArgumentException("Username must not be null!");
		}
		if(user.getPhoneNumber()==null) {
			throw new IllegalArgumentException("Phone number should not be null!");
		}
		if(user.getEmail()==null) {
			throw new IllegalArgumentException("Email should not be null!");
		}
		if(user.getPassword()==null) {
			throw new IllegalArgumentException("Password should not be null!");
		}
		
		if(repo.findByEmail(user.getEmail()) != null){ 
			throw new IllegalArgumentException("Email is already registered!");
		}
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		repo.save(user);
	}

	@Override
	public List<User> showAll() {
		List<User> users = (List<User>) repo.findAll();
		if(users.size()==0) {
			throw new NotFoundException("No Users Found!");
		}
		return users;
	}

	@Override
	public User deleteUser(int uid) throws AccessDeniedException {
		Optional<User> getUser = repo.findById(uid);
		if(!getUser.isPresent()) {
			throw new NotFoundException("User Not Found! Cannot Delete!");
		}
		User user = getUser.get();
		if(user.getRole().equals("ADMIN")) {
			throw new AccessDeniedException("Cannot Delete Administrator!");
		}
		if(user!=null) {
			repo.deleteById(uid);
		}
		return user;
	}

	@Override
	public User updateUser(User user) throws AccessDeniedException{
		Optional<User> getUser = repo.findById(user.getUid());
		if(!getUser.isPresent()) {
			throw new NotFoundException("User Not Found! Cannot Update!");
		}
		User existingUser = getUser.get();
		if(existingUser.getRole().equals("ADMIN"))
		{
			throw new AccessDeniedException("Cannot update Administrator!");
		}
		String newEmail = user.getEmail();
		existingUser.setEmail(newEmail);
		String newPhoneNumber = user.getPhoneNumber();
		existingUser.setPhoneNumber(newPhoneNumber);
		String newPassword = user.getPassword();
		existingUser.setPassword(passwordEncoder.encode(newPassword));
		User updatedUser=repo.save(existingUser);
		return updatedUser;
	}

	@Override
	public User findById(int uid) {
		Optional<User> getUser = repo.findById(uid);
		return getUser.get();
	}

	@Override
	public User login(String email, String password) {
		User user = repo.findByEmail(email);
		if(user==null) {
			throw new NotFoundException("User not found!");
		}
		if(passwordEncoder.matches(password, user.getPassword())) {
			return user;
		}
		else {
			throw new IllegalArgumentException("Incorrect password");
		}
		
	}

	@Override	
	public User changePassword(Integer uid,User user) {
		Optional<User> getUser = repo.findById(uid);
		if(!getUser.isPresent()) {
			throw new NotFoundException("User not found!");
		}
		User existingUser = getUser.get();
		String oldPassword= existingUser.getPassword();
		String newPassword = user.getPassword();
		if(passwordEncoder.matches(newPassword, oldPassword)) {
			throw new IllegalArgumentException("New password should not be the same as old password!");
		}
		existingUser.setPassword(passwordEncoder.encode(newPassword));
		User updatedUser = repo.save(existingUser);
		return updatedUser;
	}
	
	@Override
	public List<Booking> getUserBookings(Integer uid){
		Optional<User> getUser = repo.findById(uid);
		if(!getUser.isPresent()) {
			throw new NotFoundException("User not found!");
		}
		User existingUser = getUser.get();
		List<Booking> bookings =  existingUser.getBookings();
		if(bookings.isEmpty()) {
			throw new NotFoundException("User currently has no bookings");
		}
		return bookings;
	}
}

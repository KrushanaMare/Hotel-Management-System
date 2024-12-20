package com.dev.jpa;


import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.dev.model.User;

@Repository
public interface UserJPARepository extends CrudRepository<User, Integer> {

	public User findByEmail(String email);
	
	public List<User> findByRole(String role);

}

package com.hotelbooking.cozyheaven.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.hotelbooking.cozyheaven.exception.InvalidIDException;
import com.hotelbooking.cozyheaven.exception.InvalidUsernameException;
import com.hotelbooking.cozyheaven.model.User;
import com.hotelbooking.cozyheaven.repository.AuthRepository;

@Service
public class AuthService {
	@Autowired
	private AuthRepository authRepository;

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	public User signUp(User user) throws InvalidUsernameException {
		User user1 = authRepository.findByUsername(user.getUsername());
		if (user1 != null)
			throw new InvalidUsernameException("User Already Exist");
		if (user.getRole() == null)
			user.setRole("Customer");
		String encodedPassword = bCryptPasswordEncoder.encode(user.getPassword());
		user.setPassword(encodedPassword);
		

		return authRepository.save(user);
	}
	public User getUserById(int id) throws InvalidIDException {
		Optional<User> user= authRepository.findById(id);
		if(user==null)
			throw new InvalidIDException("User Not Exist!");
		return user.get();
	}

}

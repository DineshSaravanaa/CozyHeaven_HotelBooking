package com.hotelbooking.cozyheaven.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.hotelbooking.cozyheaven.controller.CustomerController;
import com.hotelbooking.cozyheaven.exception.InvalidIDException;
import com.hotelbooking.cozyheaven.exception.InvalidUsernameException;
import com.hotelbooking.cozyheaven.model.Customer;
import com.hotelbooking.cozyheaven.model.User;
import com.hotelbooking.cozyheaven.repository.AuthRepository;
import com.hotelbooking.cozyheaven.repository.CustomerRepository;

@Service
public class CustomerService 
{


	@Autowired
	private CustomerRepository customerRepository;
	
	@Autowired
	private AuthRepository authRepository;

	@Autowired
	private BCryptPasswordEncoder bcrypt;
	
	@Autowired
	private AuthService authService;



	

	public Customer addCustomer(Customer customer) throws InvalidUsernameException 
	{
		// TODO Auto-generated method stub
		User user = customer.getUser();
		user.setRole("CUSTOMER");
		user = authService.signUp(user);
		customer.setUser(user);
		customer.setAccountCreatedAt(LocalDate.now());
		return customerRepository.save(customer);
	}

	public List<Customer> getAllEmployees() 
	{
		// TODO Auto-generated method stub
		return customerRepository.findAll();
	}

	public Customer getCustomerById(int customerId) throws InvalidIDException 
	{
		// TODO Auto-generated method stub
		Optional<Customer> optional = customerRepository.findById(customerId);
		if(optional.isEmpty())
		{
			throw new InvalidIDException("Customer ID is invalid...");
		}
		return optional.get();
	}

	public Customer getCustomerByEmail(String email) throws InvalidIDException 
	{
		// TODO Auto-generated method stub
		Optional<Customer> optional = customerRepository.findByEmail(email);
		if(optional.isEmpty())
		{
			throw new InvalidIDException("email is invalid...");
		}
		return optional.get();
	}

	public void deleteCustomer(int customerId) 
	{
		// TODO Auto-generated method stub
		customerRepository.deleteById(customerId);
	}

	public Customer getCustomerByContact(String contact) throws InvalidIDException 
	{
		// TODO Auto-generated method stub
		Optional<Customer> optional = customerRepository.findByContact(contact);
		if(optional.isEmpty())
		{
			throw new InvalidIDException("contact is invalid...");
		}
		return optional.get();
	}

	public Customer getByUsername(String customerUserName) {
		return customerRepository.findByUserUsername(customerUserName);
	}

	public Customer updateCustomer(Customer existingCustomer) {
		return customerRepository.save(existingCustomer);
	}


}

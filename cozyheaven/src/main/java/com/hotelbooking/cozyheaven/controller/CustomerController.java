package com.hotelbooking.cozyheaven.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hotelbooking.cozyheaven.exception.InvalidIDException;
import com.hotelbooking.cozyheaven.exception.InvalidUsernameException;
import com.hotelbooking.cozyheaven.model.Customer;
import com.hotelbooking.cozyheaven.service.CustomerService;

@RestController
@RequestMapping("/api/customer")
@CrossOrigin(origins = {"http://localhost:5173/"})
public class CustomerController {
	@Autowired
	private CustomerService customerService;

	// add customer details from user sign up
	@PostMapping("/add")
	public Customer addCustomer(@RequestBody Customer customer) throws InvalidUsernameException
	{
		return customerService.addCustomer(customer);
	}
	
	// get all customer details 
	@GetMapping("/getAll")
	public List<Customer> getAllEmployees()
	{
		return customerService.getAllEmployees();
	}
	
	// Get customer by contact
	@GetMapping("/get/{customerId}")
	public Customer getCustomerById(@PathVariable int customerId) throws InvalidIDException 
	{
	     return customerService.getCustomerById(customerId);
	  
	}

   // Get customer by email
    @GetMapping("/get/email")
	public Customer getCustomerByContact(@RequestParam String contact) throws InvalidIDException 
	{
	     return customerService.getCustomerByContact(contact);
	}
    
// // Get customer by contact
//    @GetMapping("/get/email")
//	public Customer getCustomerByEmail(@RequestParam String email) throws InvalidIDException 
//	{
//	     return customerService.getCustomerByEmail(email);
//	}

	// Update customer
//    @PutMapping("/update/{id}")
//	public Customer updateCustomer(@PathVariable int id, @RequestBody Customer newValue) throws InvalidIDException, InvalidUsernameException
//	{
//			Customer customer = customerService.getCustomerById(id);
//			if(newValue.getName() != null)
//				customer.setName(newValue.getName());
//			if(newValue.getAddress() != null)
//				customer.setAddress(newValue.getAddress());
//			if(newValue.getContact() != null)
//				customer.setContact(newValue.getContact());
//			return customerService.addCustomer(customer);
//	}

	// Delete customer
	@DeleteMapping("/delete/{customerId}")
	public void deleteCustomer(@PathVariable int customerId) 
	{
	       customerService.deleteCustomer(customerId);
    }
	
	
	@PutMapping("/profile/update")
	public Customer updateCustomerProfile(Principal principal,@RequestBody Customer customer)
	{
		String username = principal.getName();
	    Customer existingCustomer = customerService.getByUsername(username);

	    if (customer.getName() != null) {
	        existingCustomer.setName(customer.getName());
	    }
	    if (customer.getAddress() != null) {
	        existingCustomer.setAddress(customer.getAddress());
	    }
	    if (customer.getContact() != null) {
	        existingCustomer.setContact(customer.getContact());
	    }
	    if(customer.getEmail()!=null)
	    {
	    	existingCustomer.setEmail(customer.getEmail());
	    }
		return customerService.updateCustomer(existingCustomer);
	}

	//Find the customer details with the userID
	@GetMapping("/getcustomer")
	public Customer getCustomerByUserId(Principal principal)
	{
		 String username = principal.getName();
		    return customerService.getByUsername(username);
	}

}

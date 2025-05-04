package com.hotelbooking.cozyheaven.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hotelbooking.cozyheaven.model.Customer;


public interface CustomerRepository extends JpaRepository<Customer, Integer>  
{

	Optional<Customer> findByEmail(String email);

	Optional<Customer> findByContact(String contact);

	Customer findByUserUsername(String customerUserName);


}

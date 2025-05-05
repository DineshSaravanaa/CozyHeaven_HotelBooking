package com.hotelbooking.cozyheaven.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hotelbooking.cozyheaven.model.Admin;

public interface AdminRepository extends JpaRepository<Admin, Integer>{

	Admin findByUserUsername(String username);

}

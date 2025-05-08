package com.hotelbooking.cozyheaven.controller;

import java.security.Principal;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hotelbooking.cozyheaven.exception.InvalidIDException;
import com.hotelbooking.cozyheaven.exception.InvalidUsernameException;
import com.hotelbooking.cozyheaven.model.HotelOwner;
import com.hotelbooking.cozyheaven.model.User;
import com.hotelbooking.cozyheaven.service.AuthService;
import com.hotelbooking.cozyheaven.service.HotelOwnerService;

@RestController
@RequestMapping("/api/hotelowner")
@CrossOrigin(origins = { "http://localhost:5173/" })
public class HotelOwnerController {

	@Autowired
	private HotelOwnerService hotelOwnerService;
	@Autowired
	private AuthService authService;

	Logger logger = LoggerFactory.getLogger("HotelOwnerController");

	// Add Owner And Also As User (POST)
	// 1) Get Hotel Owner Fields By Using Req Body (HotelOwner)
	// 2) Get User From Req Body And
	// 3) SignUp User As well And Set User In Hotel Owner Also
	// 4) Finally Save Owner In DB

	@PostMapping("/add")
	public HotelOwner addHotelOwner(@RequestBody HotelOwner hotelOwner)
			throws InvalidIDException, InvalidUsernameException {
		logger.info("Signing In User" + hotelOwner.getName());
		User user = hotelOwner.getUser();
		user.setRole("HotelOwner");
		authService.signUp(user);
		hotelOwner.setUser(user);
		logger.info("Signing Successfull For User" + hotelOwner.getName());
		return hotelOwnerService.addHotelOwner(hotelOwner);
	}

	// Get Owner Details (GET)
	// 1) Get Owner By Principal And Return

	@GetMapping("/get")
	public HotelOwner getOwnerByUsername(Principal principal) {

		HotelOwner owner = hotelOwnerService.getOwnerByUsername(principal.getName());
		logger.info("User Found With Id :" + owner.getId());
		return owner;

	}

	// 1) Update Owner Info (PUT)
	// 2) Using Principal For Finding Owner
	// 3) Then Update Any Values If Set In Req Body

	@PutMapping("/update")
	public HotelOwner updateInfo(Principal principal, @RequestBody HotelOwner request) throws InvalidIDException {
		HotelOwner hotelOwner = hotelOwnerService.getOwnerByUsername(principal.getName());
		if (request.getName() != null) {
			hotelOwner.setName(request.getName());
		}
		if (request.getEmail() != null) {
			hotelOwner.setEmail(request.getEmail());
		}
		if (request.getContact() != null) {
			hotelOwner.setContact(request.getContact());
		}
		if (request.getAddress() != null) {
			hotelOwner.setAddress(request.getAddress());
		}
		if (request.getGovernmenttIDType() != null) {
			hotelOwner.setGovernmenttIDType(request.getGovernmenttIDType());
		}
		if (request.getGovernmentIDNumber() != null) {
			hotelOwner.setGovernmentIDNumber(request.getGovernmentIDNumber());
		}
		if (request.getBuisnessRegistrationNumber() != null) {
			hotelOwner.setBuisnessRegistrationNumber(request.getBuisnessRegistrationNumber());
		}
		if (request.getGstin() != null) {
			hotelOwner.setGstin(request.getGstin());
		}
		if (request.getBankDetails() != null) {
			hotelOwner.setBankDetails(request.getBankDetails());
		}
		logger.info("Updation Successfull For User" + hotelOwner.getName());
		return hotelOwnerService.addHotelOwner(hotelOwner);

	}

}

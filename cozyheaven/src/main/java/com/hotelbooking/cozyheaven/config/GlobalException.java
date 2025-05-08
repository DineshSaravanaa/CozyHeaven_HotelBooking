package com.hotelbooking.cozyheaven.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.hotelbooking.cozyheaven.exception.BookingNotFoundException;
import com.hotelbooking.cozyheaven.exception.InvalidHotelNameException;
import com.hotelbooking.cozyheaven.exception.InvalidIDException;
import com.hotelbooking.cozyheaven.exception.InvalidStatusException;
import com.hotelbooking.cozyheaven.exception.InvalidUsernameException;

@RestControllerAdvice
public class GlobalException {
	
	Logger logger = LoggerFactory.getLogger("GlobalException");
	
	@ExceptionHandler(InvalidUsernameException.class)
	public ErrorResponse InvalidUsernameExceptionHandler(InvalidUsernameException e) {
		logger.error("Username is Not Valid"+e.getMessage());
		return ErrorResponse.create(e, HttpStatusCode.valueOf(400), e.getMessage());
	}
	@ExceptionHandler(InvalidIDException.class)
	public ErrorResponse InvalidIDExceptionHandler(InvalidIDException e) {
		logger.error("ID is Not Valid"+e.getMessage());
		return ErrorResponse.create(e, HttpStatusCode.valueOf(400), e.getMessage());
	}
	@ExceptionHandler(InvalidStatusException.class)
	public ErrorResponse InvalidStatusExceptionHandler(InvalidStatusException e) {
		logger.error("Status is Not Valid"+e.getMessage());
		return ErrorResponse.create(e, HttpStatusCode.valueOf(400), e.getMessage());
	}
	@ExceptionHandler(InvalidHotelNameException.class)
	public ErrorResponse InvalidHotelNameExceptionHandler(InvalidHotelNameException e) {
		logger.error("Hotel Name is Not Valid"+e.getMessage());
		return ErrorResponse.create(e, HttpStatusCode.valueOf(400), e.getMessage());
	}
	@ExceptionHandler(BookingNotFoundException.class)
	public ErrorResponse InvalidHotelNameExceptionHandler(BookingNotFoundException e) {
		return ErrorResponse.create(e, HttpStatusCode.valueOf(400), e.getMessage());
	}
	
	
	
}
	

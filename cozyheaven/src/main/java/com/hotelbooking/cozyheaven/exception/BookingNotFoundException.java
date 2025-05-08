package com.hotelbooking.cozyheaven.exception;

public class BookingNotFoundException extends RuntimeException
{
    /**
	 * 
	 */
	private static final long serialVersionUID = 5111636370338314698L;

	public BookingNotFoundException(String message) 
	{
        super(message);
    }
}


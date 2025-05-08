package com.hotelbooking.cozyheaven.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hotelbooking.cozyheaven.enums.RoomType;
import com.hotelbooking.cozyheaven.exception.InvalidIDException;
import com.hotelbooking.cozyheaven.model.Hotel;
import com.hotelbooking.cozyheaven.model.Room;
import com.hotelbooking.cozyheaven.service.HotelService;
import com.hotelbooking.cozyheaven.service.RoomService;

@RestController
@RequestMapping("/api/room")

public class RoomController {
	@Autowired
	private RoomService roomService;
	@Autowired
	private HotelService hotelService;
	
	@PostMapping("/add/{hid}")
	public Room addRoom(@PathVariable int hid, @RequestBody Room room) throws InvalidIDException
	{
		Hotel hotel =  hotelService.findByHotelID(hid);
		
		room.setHotel(hotel);
		room = roomService.addRoom(room);
		return room;
	}
	
	 @GetMapping("/getall")
	 public List<Room> getAllRooms() 
	 {
	      return roomService.getAllRooms();
	 }

	 @GetMapping("/{roomId}")
	 public Room getRoomById(@PathVariable int roomId) throws InvalidIDException 
	 {
	       return roomService.getRoomById(roomId);
	 }

	 @GetMapping("/guests/{minGuests}")
	 public Room getRoomsByMinGuests(@PathVariable int minGuests) throws InvalidIDException 
	 {
	        return roomService.getRoomsByMinGuests(minGuests);
	 }

	 @GetMapping("/type/{roomType}")
	 public Room getRoomsByType(@PathVariable RoomType roomType) throws InvalidIDException 
	 {
	        return roomService.getRoomsByType(roomType);
	 }

	 @GetMapping("/available/{status}")
	 public Room getRoomsByAvailability(@PathVariable String status) throws InvalidIDException 
	 {
	        return roomService.getRoomsByAvailability(status);
	 }
	 
	 @GetMapping("/byhotel/{hid}")
	 public List<Room> getRoomByHotel(@PathVariable int hid){
		 return roomService.getRoomByHotel(hid);
	 }


}

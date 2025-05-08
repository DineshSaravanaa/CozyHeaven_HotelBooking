package com.hotelbooking.cozyheaven.dto;

import java.util.List;

import org.springframework.stereotype.Component;

import com.hotelbooking.cozyheaven.model.Booking;

@Component
public class BookingsDto {
	
	private List<Booking> list;
	private int totalPages;
	private int totalElements; 
	private int size; 
	private int currentPage;
	public List<Booking> getList() {
		return list;
	}
	public void setList(List<Booking> list) {
		this.list = list;
	}
	public int getTotalPages() {
		return totalPages;
	}
	public void setTotalPages(int totalPages) {
		this.totalPages = totalPages;
	}
	public int getTotalElements() {
		return totalElements;
	}
	public void setTotalElements(int totalElements) {
		this.totalElements = totalElements;
	}
	public int getSize() {
		return size;
	}
	public void setSize(int size) {
		this.size = size;
	}
	public int getCurrentPage() {
		return currentPage;
	}
	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}
}

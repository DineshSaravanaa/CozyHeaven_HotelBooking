package com.hotelbooking.cozyheaven.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hotelbooking.cozyheaven.model.Refund;
import com.hotelbooking.cozyheaven.repository.RefundRepository;

@Service
public class RefundService {
	@Autowired
	private RefundRepository refundRepository;

	// To Save Refund In DB

	public Refund postRefund(Refund refund) {

		return refundRepository.save(refund);
	}

	public List<Refund> getAllRefund() 
	{
		return refundRepository.findAll();
	}

}

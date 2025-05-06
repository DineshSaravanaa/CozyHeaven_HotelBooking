package com.hotelbooking.cozyheaven.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hotelbooking.cozyheaven.enums.Status;
import com.hotelbooking.cozyheaven.exception.InvalidIDException;
import com.hotelbooking.cozyheaven.exception.InvalidStatusException;
import com.hotelbooking.cozyheaven.model.CancellationRequest;
import com.hotelbooking.cozyheaven.model.Refund;
import com.hotelbooking.cozyheaven.service.CancellationRequestService;
import com.hotelbooking.cozyheaven.service.RefundService;

@RestController
@RequestMapping("/api/refund")
public class RefundController {

   
	@Autowired
	private RefundService refundService;
	@Autowired
	private CancellationRequestService cancellationRequestService;
	
	//To Proceed Refund (Only When Cancellation Request Approved)
	@PostMapping("/proceed/{cancellationID}")
    public Refund postRefund(@PathVariable int cancellationID,@RequestBody Refund refund) throws InvalidIDException, InvalidStatusException {
		
		CancellationRequest request=  cancellationRequestService.findByID(cancellationID);
		if(!request.getStatus().equals(Status.APPROVED))
			throw new InvalidStatusException("Cancellation Request Not Approved");
		refund.setCancellationRequest(request);
		return refundService.postRefund(refund);
		
		
	}
	@GetMapping("/getall")
	public List<Refund> getAllRefund()
	{
		return refundService.getAllRefund();
	}
	

}


















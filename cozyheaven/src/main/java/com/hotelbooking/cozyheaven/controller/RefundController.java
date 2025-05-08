package com.hotelbooking.cozyheaven.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

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
	
	Logger logger = LoggerFactory.getLogger("RefundController");

	// To Proceed Refund (Only When Cancellation Request Approved) - POST
	// 1) Get Cancellation Request By Id (Path Variable)
	// 2) If The Status == APPROVED
	// 3) You Got Refund Req Body
	// 4) Then Set Cancellation In Refund And Save

	@PostMapping("/proceed/{cancellationID}")
	public Refund postRefund(@PathVariable int cancellationID, @RequestBody Refund refund)
			throws InvalidIDException, InvalidStatusException {

		CancellationRequest request = cancellationRequestService.findByID(cancellationID);
		if (!request.getStatus().equals(Status.APPROVED)) {
			logger.warn("Cancellation Request Is Not Approved , Request Id:"+request.getId());
			throw new InvalidStatusException("Cancellation Request Not Approved");	
		}
			
		refund.setCancellationRequest(request);
		logger.info("Refund Successfully Intiated With Id :"+refund.getId());
		return refundService.postRefund(refund);

	}


	@GetMapping("/getall")
	public List<Refund> getAllRefund()
	{
		return refundService.getAllRefund();
	}
	


}

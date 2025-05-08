	package com.hotelbooking.cozyheaven.model;
	
	import java.time.LocalDateTime;
	
	import com.hotelbooking.cozyheaven.enums.RefundStatus;
	
	import jakarta.persistence.Column;
	import jakarta.persistence.Entity;
	import jakarta.persistence.EnumType;
	import jakarta.persistence.Enumerated;
	import jakarta.persistence.GeneratedValue;
	import jakarta.persistence.GenerationType;
	import jakarta.persistence.Id;
	import jakarta.persistence.ManyToOne;
	
	@Entity
	public class Refund {
	
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private int id;
	
		@Column(nullable = false)
	    private Double amountRefunded;
	
	    @Column(nullable = false)
	    private String refundReason;
	
	    @Enumerated(EnumType.STRING)
	    @Column(nullable = false)
	    private RefundStatus refundStatus;
	
	    @Column(nullable = false)
	    private LocalDateTime processedDate;
	    
	    // relationship
	    @ManyToOne
	    private CancellationRequest cancellationRequest;
	
	    
		public Refund(int id, Double amountRefunded, String refundReason, RefundStatus refundStatus,
				LocalDateTime processedDate, CancellationRequest cancellationRequest) {
			super();
			this.id = id;
			this.amountRefunded = amountRefunded;
			this.refundReason = refundReason;
			this.refundStatus = refundStatus;
			this.processedDate = processedDate;
			this.cancellationRequest = cancellationRequest;
		}


		public int getId() {
			return id;
		}
	
	
		public void setId(int id) {
			this.id = id;
		}
	
	
		public Double getAmountRefunded() {
			return amountRefunded;
		}
	
	
		public void setAmountRefunded(Double amountRefunded) {
			this.amountRefunded = amountRefunded;
		}
	
	
		public String getRefundReason() {
			return refundReason;
		}
	
	
		public void setRefundReason(String refundReason) {
			this.refundReason = refundReason;
		}
	
	
		public RefundStatus getRefundStatus() {
			return refundStatus;
		}
	
	
		public void setRefundStatus(RefundStatus refundStatus) {
			this.refundStatus = refundStatus;
		}
	
	
		public LocalDateTime getProcessedDate() {
			return processedDate;
		}
	
	
		public void setProcessedDate(LocalDateTime processedDate) {
			this.processedDate = processedDate;
		}
		
		public CancellationRequest getCancellationRequest() {
			return cancellationRequest;
		}
	
	
		public void setCancellationRequest(CancellationRequest cancellationRequest) {
			this.cancellationRequest = cancellationRequest;
		}
	    
	    
	
	    
	}

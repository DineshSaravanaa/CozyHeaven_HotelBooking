import React from 'react';

function ReviewsContent() {
     // Dummy data - replace later
     const reviews = [
        { id: 'R101', guest: 'Alice Smith', hotelName: 'Sunset Paradise', rating: 4.5, reviewText: 'Beautiful resort! Room was clean...', stayDates: 'Aug 10 - Aug 12, 2024', reviewDate: '2024-08-13' },
        { id: 'R102', guest: 'Charlie Brown', hotelName: 'Cozy Downtown', rating: 3.0, reviewText: 'Decent stay. Location is great...', stayDates: 'Jul 1 - Jul 3, 2024', reviewDate: '2024-07-04' },
        { id: 'R103', guest: 'Diana Prince', hotelName: 'Mountain View', rating: 5.0, reviewText: 'Absolutely loved Mountain View Lodge!', stayDates: 'Jul 15 - Jul 18, 2024', reviewDate: '2024-07-19' },
    ];

    const generateStarsHTML = (rating) => {
        let stars = [];
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
        for (let i = 0; i < fullStars; i++) stars.push(<i key={`f${i}`} className="fas fa-star"></i>); // Rely on CSS for color
        if (halfStar) stars.push(<i key="h" className="fas fa-star-half-alt"></i>);
        for (let i = 0; i < emptyStars; i++) stars.push(<i key={`e${i}`} className="far fa-star"></i>);
        return stars;
    }

  return (
    <div>
        <h2>Customer Reviews</h2>
        {/* Filter Section - Using styles.css classes */}
        <div className="filter-section">
            <label htmlFor="review-hotel-filter">Hotel:</label>
            <select id="review-hotel-filter">
                <option value="">All Hotels</option>
                 <option value="hotel1">Sunset Paradise Resort</option>
            </select>
            <label htmlFor="review-rating-filter">Rating:</label>
            <select id="review-rating-filter">
                <option value="">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                {/* Other options */}
            </select>
            <button className="btn btn-primary btn-sm"><i className="fas fa-filter"></i> Filter</button>
        </div>

        {/* Reviews Grid - Using styles.css classes */}
        <div className="reviews-grid" id="reviews-grid-container">
             {reviews.length > 0 ? (
                 reviews.map(review => (
                    <div key={review.id} className="review-card"> {/* Use .review-card (dashboard version) */}
                        <div className="review-header">
                            <div className="review-guest">
                                <strong>{review.guest}</strong>
                                <span>Stayed: {review.stayDates || 'N/A'}</span>
                            </div>
                             {/* Use .review-rating styles from CSS */}
                            <div className="review-rating" title={`${review.rating} Stars`}>
                                {generateStarsHTML(review.rating)}
                                <span>{review.rating.toFixed(1)}</span>
                            </div>
                        </div>
                        <div className="review-body">
                           "{review.reviewText}"
                        </div>
                        <div className="review-footer">
                            Reviewed: {review.reviewDate ? new Date(review.reviewDate).toLocaleDateString() : 'N/A'} | Hotel: <strong>{review.hotelName}</strong>
                        </div>
                    </div>
                 ))
             ) : (
                 <p style={{textAlign:'center', color: 'var(--gray)', gridColumn: '1 / -1'}}>No reviews found.</p>
             )}
        </div>
    </div>
  );
}

export default ReviewsContent;
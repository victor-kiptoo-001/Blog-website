import React, { useState, useEffect } from 'react';

const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [replyContent, setReplyContent] = useState('');
  const [replyReviewId, setReplyReviewId] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('http://localhost:5555/content_reviews');
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  const handleDeleteReview = async (reviewId) => {
    try {
      await fetch(`http://localhost:5555/content_reviews/${reviewId}`, {
        method: 'DELETE',
      });
      setReviews(reviews.filter(review => review.id !== reviewId));
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const handleAddReview = async () => {
    try {
      const response = await fetch('http://localhost:5555/content_reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reviewText: newReview }),
      });
      const data = await response.json();

      setReviews([...reviews, data]);
      setNewReview('');
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  const timeAgo = (timestamp) => {
    const previous = new Date(timestamp);
    const current = new Date();

    const diff = Math.abs(current - previous);
    const minutes = Math.floor(diff / 60000); // Milliseconds to minutes

    if (minutes < 1) {
      return 'Just now';
    } else if (minutes < 60) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      const hours = Math.floor(minutes / 60);
      if (hours < 24) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
      } else {
        const days = Math.floor(hours / 24);
        return `${days} day${days > 1 ? 's' : ''} ago`;
      }
    }
  };

  const handleReply = (reviewId) => {
    setReplyReviewId(replyReviewId === reviewId ? null : reviewId);
  };

  const handleSendReply = async (reviewId, replyContent) => {
    try {
      const response = await fetch(`http://localhost:5555/content_reviews/${reviewId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reviewText: replyContent, parentId: reviewId }),
      });
      if (response.ok) {
        const newReply = await response.json();
        const updatedReviews = reviews.map(review => {
          if (review.id === reviewId) {
            return { ...review, replies: [...(review.replies || []), newReply] };
          }
          return review;
        });
        setReviews(updatedReviews);
      } else {
        console.error('Failed to send reply');
      }
      setReplyReviewId(null);
      setReplyContent(''); // Clear reply content after sending reply
    } catch (error) {
      console.error('Error sending reply:', error);
    }
  };

  return (
    <div className="mx-auto max-w-md bg-white">
      <form onSubmit={handleAddReview} className="mb-4">
        <input
          type="text"
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          placeholder="Write a review"
          className="block w-full p-2 border rounded"
        />
        <button type="submit" className="bg-gray-300 text-gray-700 py-1 px-2 rounded ml-2">
          Add Review
        </button>
      </form>
      <div className=' block p-5 shadow-lg rounded'>
              <input
                type="text"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write a reply"
                className="block w-full p-2 border rounded mb-2"
              />
              <button  className="bg-green-500 text-white py-1 px-2 rounded">
                Send Reply
              </button>
            </div>

      {reviews.map(review => (
        <div key={review.id} className=" my-5 border-b-2 border-spacing-2 px-4">
          
            
        
          <div className="flex items-center justify-between mb-2">
            <div>
              <p>{review.user_id}</p>
              <p>{timeAgo(review.created_at)}</p>
            </div>
            {/* <div>
              <button onClick={() => handleReply(review.id)} className="bg-blue-500 text-white py-1 px-2 rounded">
                Update
              </button>
              <button onClick={() => handleDeleteReview(review.id)} className="bg-red-500 text-white py-1 px-2 rounded ml-2">
                Delete
              </button>
            </div> */}
          </div>
          {/* {replyReviewId === review.id && (
            <div>
              <input
                type="text"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write a reply"
                className="block w-full p-2 border rounded mb-2"
              />
              <button onClick={() => handleSendReply(review.id, replyContent)} className="bg-green-500 text-white py-1 px-2 rounded">
                Send Reply
              </button>
            </div>
          )} */}
          <div>
          <p>{review.review_text}</p>
          </div>
          {/* Display replies */}
          {review.replies && (
            <div className="bg-gray-100 p-2 rounded mt-2">
              {review.replies.map(reply => (
                <p key={reply.id}>{reply.review_text}</p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReviewSection;




 
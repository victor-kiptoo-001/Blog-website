import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { useUser } from "./UserContext";



const AddReview = () => {
  const [reviewText, setReviewText] = useState('');
  const { id } = useParams();
  const {  isLoggedIn} = useUser();
  



  const handleReviewSubmit = async () => {
    try {
      // Send a POST request to the API to add a new review
      if (!isLoggedIn) {
        // If the user is not logged in, display an alert and prevent review submission.
        alert('Please log in to leave a review.');
        setReviewText('')
        return;

        
      }
      

      const _token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${_token}` },
    };

      const response = await axios.post(
        `http://127.0.0.1:5555/content_reviews/${id}`,
        {
          review_text: reviewText,
        }, config
      );



      // Handle the response, e.g., show a success message, update UI, etc.
      alert('Review submitted successfully');

      // Clear the review text input
      setReviewText('');
    } catch (error) {
      if (error.response && error.response.status === 403) {
        // If status code is 403, the user has already left a review
        alert('You have already left a review for this content.');
        setReviewText('')
      } else {
        // Handle other errors, e.g., display a general error message
        console.error('Error adding review:', error);
        alert('An error occurred while submitting the review. Please try again.');
      }
    }
  };

  return (
    <div className="block p-5 shadow-lg rounded">
      <textarea
      className="block w-full p-2 border rounded mb-2"
        placeholder="Add your review here..."
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      />
      <button 
      className="bg-orange-600 text-white py-1 px-2 rounded"
      onClick={handleReviewSubmit}>Submit Review</button>
    </div>
  );
};

export default AddReview;






// import React, { useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { useUser } from './UserContext';

// const AddReview = () => {
//   const [reviewText, setReviewText] = useState('');
//   const { id } = useParams();
//   const { user, isLoggedIn } = useUser(); // Assuming your user context provides an "isLoggedIn" boolean.

//   const handleReviewSubmit = async () => {
//     try {
//       if (!isLoggedIn) {
//         // If the user is not logged in, display an alert and prevent review submission.
//         alert('Please log in to leave a review.');
//         setReviewText('');
//         return;
//       }

//       // Send a POST request to the API to add a new review

//       const config = {
//         headers: { Authorization: `Bearer ${user}` },
//       };

//       const response = await axios.post(
//         `http://127.0.0.1:5555/content_reviews/${id}`,
//         {
//           review_text: reviewText,
//         },
//         config
//       );

//       // Handle the response, e.g., show a success message, update UI, etc.
//       alert('Review submitted successfully');

//       // Clear the review text input
//       setReviewText('');
//     } catch (error) {
//       // Handle errors, e.g., display an error message to the user
//       console.error('Error adding review:', error);
//     }
//   };

//   return (
//     <div className="block p-5 shadow-lg rounded">
//       <textarea
//         className="block w-full p-2 border rounded mb-2"
//         placeholder="Add your review here..."
//         value={reviewText}
//         onChange={(e) => setReviewText(e.target.value)}
//       />
//       <button
//         className="bg-green-500 text-white py-1 px-2 rounded"
//         onClick={handleReviewSubmit}
//       >
//         Submit Review
//       </button>
//     </div>
//   );
// };

// export default AddReview;


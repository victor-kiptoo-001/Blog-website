
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// // import { useParams } from "react-router-dom";
// import { useUser } from "./UserContext";

// const DeletePatchReviews = ({reviewId}) => {
//   const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
//   const [updatedReviewText, setUpdatedReviewText] = useState('');
//   // const { id } = useParams();
//   const { user } = useUser();

//   // You can check if the user is logged in based on your authentication state
//   // Set isUserLoggedIn to true if the user is logged in
//   // For example, if you have a user authentication context or state, use it here
//   useEffect(() => {
//     // For the sake of this example, let's assume the user is logged in
//     // If the user is not logged in, set isUserLoggedIn to false
//     setIsUserLoggedIn(!!user); // Assume user is logged in if `user` exists
//   }, [user]);

//   const handleReviewUpdate = async () => {
//     if (!isUserLoggedIn) {
//       // Handle the case when the user is not logged in (optional)
//       return;
//     }

//     try {
//       // Send a PATCH request to the API to update the review
//       const config = {
//         headers: { Authorization: `Bearer ${user}` },
//       };
//       axios.patch(
//         `http://127.0.0.1:5555/content_reviews/${reviewId}`,
//         {
//           review_text: updatedReviewText,
//         }, config
//       );

//       // Handle the response, e.g., show a success message, update UI, etc.

//       // Clear the updated review text input
//       setUpdatedReviewText('');
//     } catch (error) {
//       // Handle errors, e.g., display an error message to the user
//       console.error('Error updating review:', error);
//     }
//   };

//   const handleReviewDelete = async () => {
//     if (!isUserLoggedIn) {
//       // Handle the case when the user is not logged in (optional)
//       return;
//     }

//     try {
//       // Send a DELETE request to the API to delete the review
//       const config = {
//         headers: { Authorization: `Bearer ${user}` },
//       };
//        axios.delete(
//         `http://127.0.0.1:5555/content_reviews/${reviewId}`, config
//       );

//       // Handle the response, e.g., show a success message, update UI, etc.

//       // Clear the review content
//       // ...
//     } catch (error) {
//       // Handle errors, e.g., display an error message to the user
//       console.error('Error deleting review:', error);
//     }
//   };

//   return (
//     <div>
//       {isUserLoggedIn && (
//         <div className="block p-5 shadow-lg rounded">
//           <textarea
//           className="block w-full p-2 border rounded mb-2"
//             placeholder="Update your review here..."
//             value={updatedReviewText}
//             onChange={(e) => setUpdatedReviewText(e.target.value)}
//           />
//           <button className="bg-green-500 text-white py-1 px-2 rounded mx-1" onClick={handleReviewUpdate}>Update Review</button>
//           <button className="bg-red-600 text-white py-1 px-2 rounded  mx-1 mt-2" onClick={handleReviewDelete}>Delete Review</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DeletePatchReviews;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from './UserContext';

const DeletePatchReviews = ({ reviewId }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [updatedReviewText, setUpdatedReviewText] = useState('');
  const { user } = useUser();

  useEffect(() => {
    setIsUserLoggedIn(!!user);
  }, [user]);

  const handleReviewUpdate = async () => {
    if (!isUserLoggedIn) {
      alert('Please log in to update a review.');
      return;
    }

    try {
      const _token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${_token}` },
    };
      await axios.patch(`http://127.0.0.1:5555/content_reviews/${reviewId}`, {
        review_text: updatedReviewText,
      }, config);

      alert('Review updated successfully');
      setUpdatedReviewText('');
    } catch (error) {
      console.error('Error updating review:', error);
      alert('Failed to update the review.');
    }
  };

  const handleReviewDelete = async () => {
    if (!isUserLoggedIn) {
      alert('Please log in to delete a review.');
      return;
    }

    try {
      const _token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${_token}` },
    };
      await axios.delete(`http://127.0.0.1:5555/content_reviews/${reviewId}`, config);

      alert('Review deleted successfully');
      // Clear the review content or update the UI as needed
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Failed to delete the review.');
    }
  };

  return (
    <div>
      {isUserLoggedIn && (
        <div className="block p-5 shadow-lg rounded">
          <textarea
            className="block w-full p-2 border rounded mb-2"
            placeholder="Update your review here..."
            value={updatedReviewText}
            onChange={(e) => setUpdatedReviewText(e.target.value)}
          />
          <button className="bg-green-500 text-white py-1 px-2 rounded mx-1" onClick={handleReviewUpdate}>
            Update Review
          </button>
          <button className="bg-red-600 text-white py-1 px-2 rounded mx-1 mt-2" onClick={handleReviewDelete}>
            Delete Review
          </button>
        </div>
      )}
    </div>
  );
};

export default DeletePatchReviews;




// // Import necessary libraries and icons
// // Import necessary libraries and icons
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useUser } from './UserContext';
// import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// const DeletePatchReviews = ({ reviewId }) => {
//   const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
//   const [updatedReviewText, setUpdatedReviewText] = useState('');
//   const [isMenuOpen, setIsMenuOpen] = useState(false); // Added menu state
//   const [isUpdating, setIsUpdating] = useState(false); // Added updating state
//   const { user } = useUser();

//   useEffect(() => {
//     setIsUserLoggedIn(!!user);
//   }, [user]);

//   const handleReviewUpdate = async () => {
//     if (!isUserLoggedIn) {
//       alert('Please log in to update a review.');
//       return;
//     }

//     try {
//       const config = {
//         headers: { Authorization: `Bearer ${user}` },
//       };
//       await axios.patch(`http://127.0.0.1:5555/content_reviews/${reviewId}`, {
//         review_text: updatedReviewText,
//       }, config);

//       alert('Review updated successfully');
//       setUpdatedReviewText('');
//       setIsUpdating(false); // Close the textarea after update
//     } catch (error) {
//       console.error('Error updating review:', error);
//       alert('Failed to update the review.');
//     }
//   };

//   const handleReviewDelete = async () => {
//         if (!isUserLoggedIn) {
//           alert('Please log in to delete a review.');
//           return;
//         }
    
//         try {
//           const config = {
//             headers: { Authorization: `Bearer ${user}` },
//           };
//           await axios.delete(`http://127.0.0.1:5555/content_reviews/${reviewId}`, config);
    
//           alert('Review deleted successfully');
//           // Clear the review content or update the UI as needed
//         } catch (error) {
//           console.error('Error deleting review:', error);
//           alert('Failed to delete the review.');
//         }
//       };

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const toggleUpdating = () => {
//     setIsUpdating(!isUpdating);
//   };

//   return (
//     <div className="relative">
//       {isUserLoggedIn && (
//         <div className="block p-5 shadow-lg rounded relative">
//           {/* Three dots icon */}
//           <div className="absolute top-0 right-0 cursor-pointer" onClick={toggleMenu}>
//             {/* Replace with your three dots icon */}
//             <FontAwesomeIcon className="hover:text-orange-500" icon={faEllipsis} />
//           </div>

//           {/* Menu */}
//           {isMenuOpen && (
//             <div className="absolute my-[40px] top-0  right-8 bg-[#101F3C] p-2 border rounded text-white">
//               <button className="block rounded px-4 py-2 text-s hover:bg-gray-100 dark:hover:bg-orange-600" onClick={toggleUpdating}>
//                 Update Review
//               </button>
//               <button className="block rounded px-4 py-2 text-s hover:bg-gray-100 dark:hover:bg-orange-600" onClick={handleReviewDelete}>
//                 Delete Review
//               </button>
//             </div>
//           )}

//           {/* Conditionally render the textarea for updating */}
//           {isUpdating && (
//             <div>
//               <textarea
//                 className="block w-full p-2 border rounded mb-2"
//                 placeholder="Update your review here..."
//                 value={updatedReviewText}
//                 onChange={(e) => setUpdatedReviewText(e.target.value)}
//               />
//               <button
//                 className="bg-orange-600 text-white py-1 px-2 rounded mx-1"
//                 onClick={handleReviewUpdate}
//               >
//                 Save Update
//               </button>
//             </div>
//           )}

//           {/* Update and Delete buttons removed from here */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default DeletePatchReviews;

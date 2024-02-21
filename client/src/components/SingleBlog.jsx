

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
// import axios from "axios";
// import CommentLikesSection from "./CommentsLikesSection";
// import AddReview from "./AddReview";

// const SingleBlog = () => {
//   const { id } = useParams();
//   const [blog, setBlog] = useState(null);


//   const [isBookmarked, setIsBookmarked] = useState(false);
//   // const [userComments, setUserComments] = useState([]);
//   // const [commentInput, setCommentInput] = useState("");
//   const [showReviews, setShowReviews] = useState(false);

//   const [likes, setLikes] = useState(0); // Add the likes state

//   const handleLikeClick = () => {
//     setLikes(likes + 1);
//   };
  

//   const handleShareClick = () => {
//     // Add share functionality here
//   };

//   const handleBookmarkClick = () => {
//     setIsBookmarked(!isBookmarked);
//     // Save or remove the post in localStorage here
//   };

//   const handleCommentClick = () => {
//     setShowReviews(!showReviews);
//   };


//   useEffect(() => {
//     axios
//       .get(`http://127.0.0.1:5555/content/${id}`)

//       .then((data) => {
//         console.log(data);
//         setBlog(data.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching blog post:", error);
//         // Display an error message to the user
//         setBlog(null);
//       });
//   }, [id]);

//   if (!blog) {
//     return <div>Loading...</div>;
//   }
//   console.log("Blog data:", blog);
  

// const reviews = blog.review.map((rev) => (
//   <div key={rev.id} className="col-md-4 mb-5 mb-md-0">
//     <h5 className="font-bold text-2xl text-[#193d11] my-6">{rev.username}</h5>
//     <p>{rev.cretaed_at}</p> {/* Corrected the property name here */}
//     <p className="px-xl-3">
//       <FontAwesomeIcon icon={faQuoteLeft} className="pe-2" />
//       {rev.review_text}
//     </p>
//   </div>
// ));



//   return (
//     <section>
//     <div className="flex items-self-center justify-self-center bg-white p-4 rounded-md border border-gray-200 shadow-md my-40 max-w-4xl "> 
//     <div className="px-12  ">
//       <div >
//       <h3 className=" text-4xl mt-4 mb-2 font-bold hover-text-blue-600 cursor-pointer">{blog.title}</h3>
//       <div className="font-bold">{blog.author_name}</div>
//       <CommentLikesSection
//         onLikeClick={handleLikeClick}
//         onShareClick={handleShareClick}
//         onBookmarkClick={handleBookmarkClick}
//         onCommentClick={handleCommentClick}
//         likes={likes}
//         isBookmarked={isBookmarked}
//       />
//       {/* <div className="">
//         <img src={blog.image_url}alt=""/>
//       </div> */}
      
      
//       <div className="text-left leading-10 " dangerouslySetInnerHTML={{ __html: blog.description }} />
//       <CommentLikesSection
//         onLikeClick={handleLikeClick}
//         onShareClick={handleShareClick}
//         onBookmarkClick={handleBookmarkClick}
//         onCommentClick={handleCommentClick}
//         likes={likes}
//         isBookmarked={isBookmarked}
//       />

//       </div> 
      
//     </div>
//     {showReviews && 
//     <div>
//     <AddReview/>
//     <div className=" my-5 border-b-2 border-spacing-2 px-4" >
//     {reviews}
//     </div>

//     </div>}
    
//     </div>  
//   </section>
//   );
// };

// export default SingleBlog;


import moment from 'moment';
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import CommentLikesSection from "./CommentsLikesSection";
import AddReview from "./AddReview";
import DeletePatchReviews from "./DeletePatchReviews";
// import Bookmark from "./Bookmark";
import { useUser } from "./UserContext";



const SingleBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const { user } = useUser();

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [likes, setLikes] = useState(0);

  const handleLikeClick = () => {
    setLikes(likes + 1);
  };

  const handleShareClick = () => {
    // Add share functionality here
    const shareUrl =`http://127.0.0.1:5555/content/${id}`; // Replace with your actual blog URL
    
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.description,
        url: shareUrl,
      })
        .then(() => console.log('Shared successfully'))
        .catch((error) => console.error('Error sharing:', error));
    } else {
      // Fallback for browsers that do not support Web Share API
      navigator.clipboard.writeText(shareUrl)
        .then(() => {
          console.log('Link copied successfully');
          alert('Link copied to clipboard!');
        })
        .catch((error) => console.error('Error copying link:', error));
    }


  };

  // const handleBookmarkClick = () => {
  //   setIsBookmarked(!isBookmarked);
  //   // Save or remove the post in localStorage here
  // };


  const handleBookmarkClick = () => {
    const _token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${_token}` },
    };


    if (isBookmarked) {
      // Send a DELETE request to remove the bookmark
      

      axios.delete(`http://127.0.0.1:5555/remove_bookmark/${id}`, config )
        .then(() => {
          setIsBookmarked(false);
        })
        .catch((error) => {
          console.error('Error removing bookmark:', error);
        });
    } else {
      // Send a POST request to bookmark the content
      axios.post('http://127.0.0.1:5555/bookmark', {
        user_id: user,
        content_id: id,
      }, config)
        .then(() => {
          setIsBookmarked(true);
        })
        .catch((error) => {
          console.error('Error bookmarking content:', error);
        });
    }
  };

  const handleCommentClick = () => {
    setShowReviews(!showReviews);
  };

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5555/content/${id}`)
      .then((data) => {
        console.log(data);
        setBlog(data.data);
      })
      .catch((error) => {
        console.error("Error fetching blog post:", error);
        setBlog(null);
      });
  }, [id]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  const reviews = blog.review.map((rev) => (
    <div key={rev.id} className="col-md-4 mb-5 mb-md-0">
      <h5 className="font-bold text-2xl text-[#193d11] my-6">{rev.username}</h5>
      <p>{rev.cretaed_at}</p>
      <p className="px-xl-3">
        <FontAwesomeIcon icon={faQuoteLeft} className="pe-2" />
        {rev.review_text}
      </p>
      {/* Add DeletePatchReviews component here */}
      <DeletePatchReviews contentId={id} userId={rev.user_id} reviewId={rev.id} />
      
    </div>
  ));

  return (
    <section>
      <div className="flex items-self-center justify-self-center bg-white p-4 rounded-md border border-gray-200 shadow-md my-40 max-w-6xl ">
        <div className="px-12 ">
          <div>
            <h3 className="text-4xl mt-4 mb-2 font-bold hover-text-blue-600 cursor-pointer">{blog.title}</h3>
            
            <div className='flex items-center  my-3 '>
            <img
            
            alt={blog.username}
            height="50px"
            width="50px"
            className="align-middle drop-shadow-lg rounded-full "
            src={blog.profile_url}
            />
             <p className='mb-2 mx-3 font-bold'>{blog.author_name}</p>
          </div>
          <p className='text-sm text-gray-500'>Published: {moment(blog.created_at).format('MMM DD YYYY')}</p>
            <CommentLikesSection
              onLikeClick={handleLikeClick}
              onShareClick={handleShareClick}
              onBookmarkClick={handleBookmarkClick}
              onCommentClick={handleCommentClick}
              likes={likes}
              isBookmarked={isBookmarked}
            />
            <div className="text-left leading-10 " dangerouslySetInnerHTML={{ __html: blog.description }} />
            <CommentLikesSection
              onLikeClick={handleLikeClick}
              onShareClick={handleShareClick}
              onBookmarkClick={handleBookmarkClick}
              onCommentClick={handleCommentClick}
              likes={likes}
              isBookmarked={isBookmarked} />
          </div>
        </div>
        {showReviews && (
          <div className="w-full">
            <AddReview />
            <div className="my-5 border-b-2 border-spacing-2 px-4">{reviews}</div>
          </div>
        )}
        

      </div>
    </section>
  );
};

export default SingleBlog;

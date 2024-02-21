import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faComment,
  faShare,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
// import { Link } from "react-router-dom";





function CommentLikeSection ({ onLikeClick, onShareClick, onBookmarkClick, likes, isBookmarked, onCommentClick}) {




  return(
    <div className="my-6 px-4 border-y-2 py-5 ">
      <div className="text-base  text-[#101F3C] flex space-x-6 justify-end">
      <button onClick={onLikeClick} className=" ">
        <FontAwesomeIcon className="hover:text-orange-500" icon={faHeart} /> {likes}
      </button>
      <button onClick={onCommentClick} className=" ">
         <FontAwesomeIcon className="hover:text-orange-500" icon={faComment} />
        
      </button>
      
      <button onClick={onShareClick} className=" ">
        <FontAwesomeIcon className="hover:text-orange-500" icon={faShare} /> 
      </button>
      <button onClick={onBookmarkClick} className=" ">
        <FontAwesomeIcon className="hover:text-orange-500" icon={faBookmark} /> {isBookmarked ? "Unsave" : "Save"}
      </button>
      {/* Add comments functionality here if needed */}
    </div>
  

    </div>
  )
}

export default CommentLikeSection
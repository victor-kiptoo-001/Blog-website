// import React from 'react'
// import { FaUser } from "react-icons/fa";
// import { Link } from 'react-router-dom';

// const BlogCards = ({blogs, currentPage, pageSize, selectedCategory}) => {
//     const filteredBlogs = blogs
//         .filter((blogs) => !selectedCategory || blogs.category === selectedCategory)
//         .slice((currentPage - 1) * pageSize, currentPage * pageSize);
//   return (
//     <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8'>
//         {
//           filteredBlogs.map((blog) => (
//             <a href={`blogs/${blog.id}`} key={blog.id} className="block p-5 shadow-lg rounded cursor-pointer">
//                 <div>
//                     <img src={blog.uploadimage.image_url} alt="" className='w-full'/>
//                 </div>
//                 <h3 className="mt-4 mb-2 font-bold hover:text-blue-600 cursor-pointer"> <link to='/singleblog'>{blog.title}</link></h3>
//                 <p className='mb-2'><FaUser className='inline-flex items-center mr-2'/>{blog.username}</p>
//                 <p className='text-sm text-gray-500'>Published: {blog.created_at}</p>
//             </a>
//         ))  
//         }
//     </div>
//   )
// }

// export default BlogCards



// import React from 'react';
// import { FaUser } from "react-icons/fa";
// import { Link } from 'react-router-dom';

// const BlogCards = ({ blogs, currentPage, pageSize, selectedCategory }) => {
//   const filteredBlogs = blogs
//     .filter((blog) => !selectedCategory || blog.category === selectedCategory)
//     .slice((currentPage - 1) * pageSize, currentPage * pageSize);

  
//   const images = blogs.uploadimage.map((image) => {
//     return (
//       <div key={image.id}>

//         <img src={image.image_url} alt="" className='w-full' />
//       </div>
//     )
//   })

//   return (
//     <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10'>
//       {filteredBlogs.map((blog) => (
//         <Link to={`/content/${blog.id}`}key={blog.id} className="block p-5 shadow-lg rounded cursor-pointer">
//           <div>
//             {/* <img src={blog.image_url} alt="" className='w-full' /> */}
//             {images}
//           </div>
//           <h3 className="mt-4 mb-2 font-bold hover:text-blue-600 cursor-pointer">{blog.title}</h3>
//           <p className='mb-2'><FaUser className='inline-flex items-center mr-2' />{blog.username}</p>
//           <p className='text-sm text-gray-500'>Published: {blog.created_at}</p>
//         </Link>
//       ))}
//     </div>
//   );
// }

// export default BlogCards;

import moment from 'moment';
import React from 'react';
// import { FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';

const BlogCards = ({ blogs, currentPage, pageSize, selectedCategory }) => {
  const filteredBlogs = blogs
    .filter((blog) => !selectedCategory || blog.category === selectedCategory)
    .slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10'>
      {filteredBlogs.map((blog) => (
        <Link to={`/content/${blog.id}`} key={blog.id} className="block p-5 shadow-lg rounded cursor-pointer">
          <div>
        
                <img src={blog.image_url} alt="" className='w-full h-64' />
              
          
          </div>
          <h3 className="mt-4 mb-2 font-bold hover-text-blue-600 cursor-pointer">{blog.title}</h3>
          <div className='flex items-center my-3 '>
            <img
            // unoptimized
            alt={blog.username}
            height="40px"
            width="40px"
            className=" align-middle drop-shadow-lg rounded-full"
            src={blog.profile_url}
            />
             <p className='mb-2 mx-3'>{blog.username}</p>


          </div>
          
          <p className='text-sm text-gray-500'>Published: {moment(blog.created_at).format('MMM DD YYYY')}</p>
          
        </Link>
      ))}
    </div>
  );
}

export default BlogCards;

// import { useState } from "react";

// function CategorySelection ({ onSelectCategory, activeCategory }) {

//     // Define your categories here, or fetch them from an API
//     const categories = ["Startups", "Security", "AI", "Apps","Tech"];

//     return (
//         <div className="px-4 mb-8 lg:space-x-16 gap-12 flex flex-wrap items-center border-b-2 py-5 text-gray-900 font-semibold">
//             <button onClick={() => onSelectCategory(null)} className={`lg:ml-12 ${activeCategory ? '' : 'active-button'}`}>All</button>
//             {categories.map((category) => (
//                 <button
//                     key={category}
//                     className={`mr-2 space-x-16  ${activeCategory === category ? 'active-button' : ''}`}
//                     onClick={() => onSelectCategory(category)}
//                 >
//                     {category}
//                 </button>
//             ))}

//         </div>
//     );
// };

// export default CategorySelection;

// import { useState, useEffect } from "react";

// function CategorySelection({ onSelectCategory, activeCategory }) {
//     const [categories, setCategories] = useState([]);

//     // Define a useEffect hook to fetch categories from the API
//     useEffect(() => {
//         fetch('http://127.0.0.1:5555/categories')
//             .then(response => response.json())
//             .then(data => setCategories(data))
//             .catch(error => console.error('Error fetching categories:', error));
//     }, []);

//     return (
//         <div className="px-4 mb-8 lg:space-x-16 gap-12 flex flex-wrap items-center border-b-2 py-5 text-gray-900 font-semibold">
//             <button onClick={() => onSelectCategory(null)} className={`lg:ml-12 ${activeCategory ? '' : 'active-button'}`}>
//                 All
//             </button>
//             {categories.map(category => (
//                 <button
//                     key={category.id}
//                     className={`mr-2 space-x-16  ${activeCategory === category.name ? 'active-button' : ''}`}
//                     onClick={() => onSelectCategory(category.name)}
//                 >
//                     {category.name}
//                 </button>
//             ))}
//         </div>
//     );
// }

// export default CategorySelection;

// import { useState, useEffect } from "react";
// import BlogCards from "./BlogCards";

// function CategorySelection({ onSelectCategory, activeCategory, pageSize }) {
//     const [categories, setCategories] = useState([]);
//     const [blogs, setBlogs] = useState([]);
//     const [categoryId, setCategoryId] = useState(null);

//     // Define a useEffect hook to fetch categories from the API
//     useEffect(() => {
//         fetch('http://127.0.0.1:5555/categories')
//             .then(response => response.json())
//             .then(data => setCategories(data))
//             .catch(error => console.error('Error fetching categories:', error));
//     }, []);

//     // Define a useEffect hook to fetch blogs based on the selected category
//     // useEffect(() => {
//     //     if (activeCategory) {
//     //         fetch(`http://127.0.0.1:5555/contents?categoryId=${categoryId}`)
//     //             .then(response => response.json())
//     //             .then(data => setBlogs(data))
//     //             .catch(error => console.error('Error fetching blogs:', error));
//     //     }
//     // }, [activeCategory]);

//     useEffect(() => {
//         // Ensure that activeCategory is not null before fetching content
//         if (activeCategory) {
//             // Fetch the category ID based on the activeCategory
//             // Replace this with your actual logic to find the category ID by name
//             const category = categories.find(cat => cat.name === activeCategory);
//             if (category) {
//                 const categoryId = category.id;
//                 setCategoryId(categoryId); // Update the categoryId state
//                 // Now you have the categoryId, you can use it in your API request
//                 fetch(`http://127.0.0.1:5555/contents?categoryId=${categoryId}`)
//                     .then(response => response.json())
//                     .then(data => setBlogs(data))
//                     .catch(error => console.error('Error fetching blogs:', error));
//             }
//         }
//     }, [activeCategory, categories]);
//     return (
//         <div className="px-4 mb-8 lg:space-x-16 gap-12 flex flex-wrap items-center border-b-2 py-5 text-gray-900 font-semibold">
//             <button onClick={() => onSelectCategory(null)} className={`lg:ml-12 ${activeCategory ? '' : 'active-button'}`}>
//                 All
//             </button>
//             {categories.map(category => (
//                 <button
//                     key={category.id}
//                     className={`mr-2 space-x-16  ${activeCategory === category.name ? 'active-button' : ''}`}
//                     onClick={() => onSelectCategory(category.name)}
//                 >
//                     {category.name}
//                 </button>

//             ))}
//             <div>
//             {/* <BlogCards blogs={blogs} currentPage={1} selectedCategory={activeCategory} pageSize={pageSize} /> */}
//         </div>
//         </div>
//     );
// }

// export default CategorySelection;

// import { useState, useEffect } from "react";
// // import BlogCards from "./BlogCards";
// import moment from 'moment';
// import React from 'react';
// // import { FaUser } from "react-icons/fa";
// import { Link } from 'react-router-dom';

// function CategorySelection({ onSelectCategory, activeCategory, pageSize }) {
//   const [categories, setCategories] = useState([]);
//   const [blogs, setBlogs] = useState([]);
//   const [categoryId, setCategoryId] = useState(null);

//   // Define a useEffect hook to fetch categories from the API
//   useEffect(() => {
//     fetch("http://127.0.0.1:5555/categories")
//       .then((response) => response.json())
//       .then((data) => setCategories(data))
//       .catch((error) => console.error("Error fetching categories:", error));
//   }, []);

//   // Define a useEffect hook to fetch blogs based on the selected category
//   useEffect(() => {
//     // Ensure that activeCategory is not null before fetching content
//     if (activeCategory) {
//       // Fetch the category ID based on the activeCategory
//       // Replace this with your actual logic to find the category ID by name
//       const category = categories.find((cat) => cat.name === activeCategory);
//       console.log("Active Category:", activeCategory);
//       console.log(
//         "Category ID:",
//         category ? category.id : "Category not found",
//       );

//       if (category) {
//         const categoryId = category.id;
//         setCategoryId(categoryId); // Update the categoryId state
//         // Now you have the categoryId, you can use it in your API request
//         fetch(`http://127.0.0.1:5555/contents?categoryId=${categoryId}`)
//           .then((response) => response.json())
//           .then((data) => {
//             console.log("Fetched Blogs:", data);
//             setBlogs(data);
//           })
//           .catch((error) => console.error("Error fetching blogs:", error));
//       }
//     } else {
//       // If activeCategory is null (All category selected), fetch all blogs
//       fetch("http://127.0.0.1:5555/contents")
//         .then((response) => response.json())
//         .then((data) => {
//           console.log("Fetched All Blogs:", data);
//           setBlogs(data);
//         })
//         .catch((error) => console.error("Error fetching blogs:", error));
//     }
//   }, [activeCategory, categories]);

//   return (
//     <div>
//       <div className="mb-8 flex flex-wrap items-center gap-12 border-b-2 px-4 py-5 font-semibold text-gray-900 lg:space-x-16">
//         <button
//           onClick={() => onSelectCategory(null)}
//           className={`lg:ml-12 ${activeCategory ? "" : "active-button"}`}
//         >
//           All
//         </button>
//         {categories.map((category) => (
//           <button
//             key={category.id}
//             className={`mr-2 space-x-16  ${
//               activeCategory === category.name ? "active-button" : ""
//             }`}
//             onClick={() => onSelectCategory(category.name)}
//           >
//             {category.name}
//           </button>
//         ))}
//       </div>

//       <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10'>
//       {blogs.map((blog) => (
//         <Link to={`/content/${blog.id}`} key={blog.id} className="block p-5 shadow-lg rounded cursor-pointer">
//           <div>

//                 <img src={blog.image_url} alt="" className='w-full h-64' />

//           </div>
//           <h3 className="mt-4 mb-2 font-bold hover-text-blue-600 cursor-pointer">{blog.title}</h3>
//           <div className='flex items-center relative my-3 '>
//             <img
//             unoptimized
//             alt={blog.username}
//             height="40px"
//             width="40px"
//             className=" align-middle drop-shadow-lg rounded-full"
//             src={blog.profile_url}
//             />
//              <p className='mb-2 mx-3'>{blog.username}</p>

//           </div>

//           <p className='text-sm text-gray-500'>Published: {moment(blog.created_at).format('MMM DD YYYY')}</p>

//         </Link>
//       ))}
//     </div>

//       <div>

//       </div>
//     </div>
//   );
// }

// export default CategorySelection;

import React, { useState, useEffect } from "react";
import moment from "moment";
import { Link } from "react-router-dom"; 
// import Sidebar from "./Sidebar";

function CategorySelection({ onSelectCategory, activeCategory, pageSize }) {
  const [categories, setCategories] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [categoryId, setCategoryId] = useState(null);

  // Define a useEffect hook to fetch categories from the API
  useEffect(() => {
    fetch("http://127.0.0.1:5555/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  // Define a useEffect hook to fetch blogs based on the selected category
  useEffect(() => {
    // Ensure that activeCategory is not null before fetching content
    if (activeCategory) {
      // Fetch the category ID based on the activeCategory
      const category = categories.find((cat) => cat.name === activeCategory);

      if (category) {
        const categoryId = category.id;
        setCategoryId(categoryId); // Update the categoryId state
        // Now you have the categoryId, you can use it in your API request
        fetch(`http://127.0.0.1:5555/contents?categoryId=${categoryId}`)
          .then((response) => response.json())
          .then((data) => {
            console.log("Fetched Blogs:", data);
            setBlogs(data);
          })
          .catch((error) => console.error("Error fetching blogs:", error));
      }
    } else {
      // If activeCategory is null (All category selected), fetch all blogs
      fetch("http://127.0.0.1:5555/contents")
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched All Blogs:", data);
          setBlogs(data);
        })
        .catch((error) => console.error("Error fetching blogs:", error));
    }
  }, [activeCategory, categories]);

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center gap-12 border-b-2 px-4 py-5 font-semibold text-gray-900 lg:space-x-16">
        <button
          onClick={() => onSelectCategory(null)}
          className={`lg:ml-12 ${activeCategory ? "" : "active-button"}`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            className={`mr-2 space-x-16  ${
              activeCategory === category.name ? "active-button" : ""
            }`}
            onClick={() => onSelectCategory(category.name)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Conditionally render blog cards only if a category is selected */}
      {activeCategory && (
        // <div className="flex flex-col gap-12 lg:flex-row ">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
            {blogs.map((blog) => (
              <Link
                to={`/content/${blog.id}`}
                key={blog.id}
                className="block cursor-pointer rounded p-5 shadow-lg"
              >
                <div>
                  <img src={blog.image_url} alt="" className="h-64 w-full" />
                </div>
                <h3 className="hover-text-blue-600 mb-2 mt-4 cursor-pointer font-bold">
                  {blog.title}
                </h3>
                <div className="relative my-3 flex items-center ">
                  <img
                    alt={blog.username}
                    height="40px"
                    width="40px"
                    className="rounded-full align-middle drop-shadow-lg"
                    src={blog.profile_url}
                  />
                  <p className="mx-3 mb-2">{blog.username}</p>
                </div>
                <p className="text-sm text-gray-500">
                  Published: {moment(blog.created_at).format("MMM DD YYYY")}
                </p>
              </Link>
            ))}

           {/* <Sidebar/>  */}
          </div>
           

        // </div>
      )}
    </div>
  );
}

export default CategorySelection;

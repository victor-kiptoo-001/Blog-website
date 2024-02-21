import React from 'react';
import Banner from './Banner';
// import CategorySelection from './CategorySelection';
// import Pagination from './Pagination';
import BlogPage from './BlogPage';

function HomePage () {


  return (

    <div className='min-h-[1600px] '>
      <Banner/>      
      
      <BlogPage/>      
    </div>
    

    
  )
}
export default HomePage;
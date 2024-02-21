import React from 'react'
import { Link } from 'react-router-dom'

import { FaArrowRight } from "react-icons/fa6";

function Banner () {
  return (
    <div className=' bg-[#F44F10] px-4 py-32 mx-auto flex items-center justify-center'>
        <div className='text-white text-center'>
            <h1 className='lg:text-7xl text-5xl leading-snug font-bold mb-5'>Welcome to Our Blog</h1>
            <p className='text-gray-100 lg:w-3/5 mx-auto mb-5'>Start your blog today and join a community of writers and readers who are passionate about sharing their stories and ideas. We offer everything you need to get started, from helpful tips and tutorials.</p>

            {/* btn here */}
            <div>
                <Link to="/blogs" className='inline-flex items-center py-1 font-medium hover:text-orange-500'>Learn more <FaArrowRight className='mt-1 ml-2'/></Link>
            </div>
        </div>
    </div>
  )
}

export default Banner
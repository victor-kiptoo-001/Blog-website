
import moment from 'moment';import { Link } from 'react-router-dom';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from './UserContext';

function Collection() {
  const { user } = useUser();
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    // Fetch bookmarks when the component mounts
    const _token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${_token}` },
    };
    axios
      .get(`http://127.0.0.1:5555/bookmarks`, config)
      .then((response) => {
        if (Array.isArray(response.data.content)) {
          setBookmarks(response.data.content);
        } else {
          console.error('Invalid bookmarks data received:', response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching bookmarks: ', error);
      });
  }, [user]);

  return (
    <div className="mt-10">
      <h1 className="text-2xl font-bold text-center">Saved Blogs</h1>
      {bookmarks.map((bookmark) => (
        <Link to={`/content/${bookmark.content_id}`}
          key={bookmark.id}
          className="flex flex-col items-center my-4 mx-7 justify-centerbg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-[#101F3C] dark:hover:bg-gray-700"

          // bg-[#101F3C]
        >
          <img
            className="object-cover w-full rounded-t-lg h-[70px] md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
            src={bookmark.image_url}
            alt={bookmark.title}
          />
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {bookmark.title}
            </h5>
            <div className='flex items-center  my-3 '>
            <img
            
            alt={bookmark.a}
            height="40px"
            width="40px"
            className="align-middle drop-shadow-lg rounded-full"
            src={bookmark.profile_url}
            />
             <p className='mb-2 mx-3 text-white'>{bookmark.author_name}</p>
             </div>
             <p className='text-sm text-gray-500'>Published: {moment(bookmark.created_at).format('MMM DD YYYY')}</p>



          </div>
        </Link>
      ))}
    </div>
  );
}

export default Collection;

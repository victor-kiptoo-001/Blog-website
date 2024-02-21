import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { useParams } from "react-router-dom";
import { useUser } from "./UserContext";
import EditUserProfile from "./EditUserProfile"
import Collection from './Collection';

function UserProfile() {

  // const { id } = useParams();
  const { user } = useUser();
  const [profile, setProfile] = useState({
    fullname: '',
    about: '',
  });



useEffect(() => {
    // Fetch the user's profile data when the component mounts
    console.log(user)
    const _token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${_token}` },
    };

    axios.get(`http://127.0.0.1:5555/profile`,config)
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
      });
  }, [user]);




  return (
    <section className="my-36 bg-white mx-h-[1000px] ">
      <div className="flex items-center ">

        <div className="max-w-2xl overflow-hidden border-r-2 bg-white shadow sm:rounded-lg mx-5">
          <div className="px-4 py-5 sm:px-6 flex ">
            
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              About
            </h3> 
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {profile.fullname}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">User name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {profile.username}
                </dd>
              </div>
              
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Email address</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {profile.email}
                </dd>
              </div>
              
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">About</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {profile.about}
                </dd>
              </div>
            </dl>
           

          </div>
        </div>
        <EditUserProfile
  user={user}
  onUpdateSuccess={(data) => {
    // Handle success, e.g., show a success message
    console.log('Profile updated successfully:', data);
  }}
  onUpdateError={(error) => {
    // Handle errors, e.g., display an error message
    console.error('Error updating profile:', error);
  }}
/>




  <div class="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900">
    
    <div class="mx-auto w-32 h-32 -mt-16 border-4 border-white rounded-full overflow-hidden">
        <img class="object-cover object-center h-32" src={profile.profile_url} alt='profile'/>
    </div>
    <div class="text-center mt-2">
        <h2 class="font-semibold">{profile.fullname}</h2>
        {/* <p class="text-gray-500">Freelance Web Designer</p> */}
    </div>
    
    <div class="p-4 border-t mx-8 mt-2">
        {/* <button class="w-1/2 mx-auto rounded bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2">Edit photo</button> */}
        
        <button
              className="rounded-lg bg-[#F44F10] px-4 py-3 text-white transition hover:bg-[#cf7c10]"
            
            >
              Edit photo
            </button>
    </div>
</div>

      </div>
      <Collection/>
    </section>
  );
}

export default UserProfile;

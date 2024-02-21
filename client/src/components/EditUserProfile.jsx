import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from "./UserContext";


const UpdateUserProfile = ({onUpdateSuccess, onUpdateError }) => {
  const [profileData, setProfileData] = useState({
    fullname: '',
    about: '',
  });
  const { user } = useUser();




  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleUpdateProfile = () => {
    const _token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${_token}` },
    };




    axios
      .post(`http://127.0.0.1:5555/profile`, profileData, config
      )
      .then((response) => {
        onUpdateSuccess(response.data);
      })
      .catch((error) => {
        onUpdateError(error);
      });
  };

  return (
    <div>
      <h2 className='text-2xl font-bold'>Update Your Profile</h2>
      <form className="block p-5 shadow-lg rounded">
        <div>
          <label htmlFor="fullname">Full Name</label>
          <input
          className="block w-full p-2 border rounded mb-2"
            type="text"
            id="fullname"
            name="fullname"
            value={profileData.fullname}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="about">About</label>
          <textarea
          className="block w-full p-2 border rounded mb-2"
            id="about"
            name="about"
            value={profileData.about}
            onChange={handleInputChange}
          />
        </div>
        
        <button
        type="button" onClick={handleUpdateProfile}
              className="rounded-lg bg-[#F44F10] px-4 py-3 text-white transition hover:bg-[#cf7c10]"
            
            >
              Create profile
            </button>
      </form>
    </div>
  );
};

export default UpdateUserProfile;

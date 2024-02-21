

import React, { useState, useEffect } from 'react';
import { useUser } from "./UserContext";
import axios from 'axios';
import AddCategories from './AddCategories';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [content, setContent] = useState([]);
  const [isAdmin, setIsAdmin] = useState(true);
  const { user } = useUser();

  // Function to fetch users and content
  const fetchData = async () => {
    const _token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${_token}` },
    };

    try {
      const responseUsers = await axios.get(`http://127.0.0.1:5555/users`, config);
      const dataUsers = responseUsers.data;

      if (Array.isArray(dataUsers)) {
        setUsers(dataUsers);
      } else {
        console.error('Invalid users data received:', dataUsers);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }

    try {
      const responseContent = await axios.get('http://127.0.0.1:5555/contents');
      const dataContent = responseContent.data;

      if (Array.isArray(dataContent)) {
        setContent(dataContent);
      } else {
        console.error('Invalid content data received:', dataContent);
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  useEffect(() => {
    // Initial data fetch
    fetchData();
  }, [user]);

  const deleteContent = (contentId) => {
    if (isAdmin) {
      const _token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${_token}` },
    };

      axios.delete(`http://127.0.0.1:5555/content/${contentId}`, config)
        .then(response => {
          console.log('Content deleted successfully');
          // Show an alert
          window.alert('Content deleted successfully');
          
          // Refresh content or update UI after deletion
          fetchData();
        })
        .catch(error => {
          console.error('Error deleting content:', error);
          // Handle the error, maybe show a user-friendly message to the admin
        });
    } else {
      console.log('Permission denied');
    }
  };
  // Rest of the component



  const deactivateUser = (userId) => {
    if (isAdmin) {
      const _token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${_token}` },
    };

  
      axios.post(`http://127.0.0.1:5555/users/${userId}`, null, config)
        .then(response => {
          console.log('User deactivated successfully');
          // Refresh users or update UI after deactivation
          window.alert('User deactivated successfully');
        })
        .catch(error => {
          console.error('Error deactivating user:', error);
          // Handle the error, maybe show a user-friendly message to the admin
        });
    } else {
      console.log('Permission denied');
    }
  };
  

  function approveContent(contentId) {
    const _token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${_token}` },
    };

  
    axios.patch(`http://127.0.0.1:5555/content/${contentId}`, 
      { approvalStatus: 'approved' }, config)
      .then((response) => {
        // // Handle success
        // alert('Content approved successfully!');
        setContent((prevContent) => {
          const updatedContent = prevContent.map((item) => {
            if (item.id === contentId) {
              return { ...item, approvalStatus: false };
            }
            return item;
          });
          return updatedContent;
        });
        console.log(response)
      })
      .catch((error) => {
        console.error('Error approving content:', error);
      });
  }
  


const handleChange=()=>{}
  return (
    <div className="p-4 mt-[70px]">
      {isAdmin && (
        <div>
          <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

          <div>
            <h2 className="text-lg font-semibold mb-2">Users</h2>
            <table className="min-w-full border border-collapse">
              <thead>
                <tr>
                  <th className="border p-2">ID</th>
                  <th className="border p-2">Username</th>
                  <th className="border p-2">Status</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  
                  <tr key={user.id}>
                    <td className="border p-2">{user.id}</td>
                    <td className="border p-2">{user.username}</td>
                    <td className="border p-2"><input type="checkbox" checked={user.is_active} readOnly/></td>
                    <td className="border p-2">{user.email}</td>
                    <td className="border p-2">
                      <button onClick={() => deactivateUser(user.id)} className="px-4 py-1 bg-red-500 text-white rounded">
                        Deactivate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Content</h2>
            <table className="min-w-full border border-collapse">
              <thead>
                <tr>
                  <th className="border p-2">ID</th>
                  <th className="border p-2">Title</th>
                  
                  <th className="border p-2">Status</th>
                  <th className="border p-2">Action</th>
                  <th className="border p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {content.map(item => (
                  <tr key={item.id}>
                    <td className="border p-2">{item.id}</td>
                    <td className="border p-2">{item.title}</td>
                    
                    <td className="border p-2">
                      <input type="checkbox" onChange={handleChange()} checked
                      ={item.is_approved} readOnly></input>

                    </td>
                    <td className="border p-2">
                      <button onClick={() => deleteContent(item.id)} className="px-4 py-1 bg-red-500 text-white rounded">
                        Remove
                      </button>
                    </td>
                    <td className="text-left">
                
                <button 
                className="px-4 py-1 bg-red-500 text-white rounded"
                  onClick={() => approveContent(item.id)}>Approve</button>
                </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <AddCategories isAdmin={isAdmin}/>
        </div>
       
        
      )}
    </div>
  );
};

export default AdminDashboard;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from "./UserContext";


const AddCategories = ({ isAdmin }) => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const { user } = useUser();


  useEffect(() => {
    // Fetch categories when the component mounts
    axios.get('http://127.0.0.1:5555/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleAddCategory = () => {
    if (isAdmin) {
      const _token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${_token}` },
    };


      axios.post(
        'http://127.0.0.1:5555/categories',
        { name: newCategory },
        config
      )
        .then(response => {
          console.log(response.data.message);
          // Update categories with the new one
          setCategories(prevCategories => [...prevCategories, { id: response.data.id, name: newCategory }]);
          // Clear the input field
          setNewCategory('');
        })
        .catch(error => {
          console.error('Error adding category:', error);
        });
    } else {
      console.log('Permission denied');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Categories</h2>
      <table className="min-w-full border border-collapse">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => (
            <tr key={category.id}>
              <td className="border p-2">{category.id}</td>
              <td className="border p-2">{category.name}</td>
            </tr>
          ))}
          <tr>
            <td className="border p-2">New</td>
            <td className="border p-2">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="p-1 border"
              />
            </td>
            <td className="border p-2">
              <button
                onClick={handleAddCategory}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Add Category
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AddCategories;
